import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
import { fetchCategoryProducts } from '../../../../../redux/actions/categoryProduct';
import productApi from '../../../../../api/productApi';
import styles from './DropdownMenuProduct.module.css';
const DropdownMenuProduct = ({ mobile, active }) => {
    const [productList, setProductList] = useState([]);
    const elementRef = useRef(null);
    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.categoryProduct.dataCate);
    useEffect(() => {
        dispatch(fetchCategoryProducts());
        const fetchProduct = async () => {
            const params = {
                name: '',
                status: '',
                sortBy: 'pro_buyed',
                sortDir: 'DESC',
                limit: '6',
                page: '1',
            };
            const response = await productApi.search(params);
            if (response.dataProduct && response.dataProduct.length > 0) {
                setProductList(response.dataProduct);
            }
        };
        fetchProduct();
    }, []);
    return (
        <div
            ref={elementRef}
            className={clsx(styles.container, {
                [styles.active]: active,
            })}
            style={
                mobile
                    ? {
                          height: active ? `${elementRef.current.scrollHeight}px` : 0,
                      }
                    : {}
            }
        >
            <div className={clsx(styles.left)}>
                <ul>
                    <h3>Danh mục sản phẩm</h3>
                    {categoryList.map((item) => (
                        <li key={item.id}>
                            <Link to={`/danh-muc-san-pham/${item.id}`}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={clsx(styles.right)}>
                <h3>Sản phẩm bán chạy</h3>
                <div className={clsx(styles.topSellList)}>
                    {productList.map((item) => (
                        <div key={item.pro_id} className={clsx(styles.item)}>
                            <Link to={`/product/${item.pro_id}`}>
                                <img src={`${item.baseURLImg}${item.pro_img}`} alt="" />
                            </Link>
                            <div className={clsx(styles.info)}>
                                <Link className={clsx(styles.name)} to={`/product/${item.pro_id}`}>
                                    {item.pro_name}
                                </Link>
                                <span className={clsx(styles.price)}>
                                    <NumberFormat
                                        value={item.pro_price}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix="&#8363;"
                                    />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropdownMenuProduct;
