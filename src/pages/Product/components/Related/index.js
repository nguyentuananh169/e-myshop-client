import clsx from 'clsx';
import { useEffect, useState } from 'react';
import productApi from '../../../../api/productApi';
import TitleBox from '../../../../components/TitleBox';
import ProductItem from '../../../Home/components/ProductList/ProductItem';
import ProductItemLoading from '../../../Home/components/ProductList/ProductItem/Loading';
import styles from './Related.module.css';
function Related({ categoryId }) {
    const [isLoading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        if (categoryId) {
            const fectProduct = async () => {
                const params = {
                    category: categoryId,
                    brand: '',
                    price: '',
                    sale: '',
                    limit: 4,
                    page: 1,
                    status: '',
                    sortBy: '',
                    sortDir: '',
                };
                const response = await productApi.getByCategory(params);
                setLoading(false);
                if (response.dataProduct.length > 0) {
                    setProductList(response.dataProduct);
                }
            };
            fectProduct();
        }
    }, [categoryId]);
    return (
        <>
            <TitleBox title="Sản phẩm liên quan" />
            <div className="container">
                <div className={clsx(styles.productList)}>
                    {isLoading ? (
                        <ProductItemLoading count={4} />
                    ) : (
                        productList.map((item) => <ProductItem key={item.pro_id} item={item} />)
                    )}
                </div>
            </div>
        </>
    );
}

export default Related;
