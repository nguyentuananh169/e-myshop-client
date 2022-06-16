import clsx from 'clsx';
import wishListApi from '../../../api/wishListApi';
import HeaderRight from '../components/HeaderRight';
import ContentRight from '../components/ContentRight';
import styles from './WishList.module.css';
import background from '../../../assets/img/background/icon-account-info.png';
import { useEffect, useState } from 'react';
import ProductItem from '../../Home/components/ProductList/ProductItem';
import { useDispatch } from 'react-redux';
import { addNewToastMessage } from '../../../redux/actions/toastMessage';
import Loading from '../../Home/components/ProductList/ProductItem/Loading';
import Pagination from '../../../components/Pagination';
import NoData from '../../../components/NoData';
function WishList() {
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [isRemove, setRemove] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchWishList();
    }, []);
    const fetchWishList = async (page = 1, limit = 3) => {
        const params = {
            page,
            limit,
        };
        setLoading(true);
        const response = await wishListApi.getByUser(params);
        setLoading(false);
        setProductList(response.wishList);
        setPage(response.page);
        setTotalPage(response.totalPage);
    };
    const handleRemove = async (id) => {
        setRemove(true);
        const response = await wishListApi.wish(id);
        setRemove(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
        fetchWishList();
    };
    const handleChangePage = async (valuePage) => {
        if (valuePage > 0 && valuePage <= totalPage && valuePage !== page) {
            fetchWishList(valuePage);
        }
    };
    return (
        <>
            <HeaderRight
                title="Sản phẩm yêu thích"
                text="Xem và kiểm tra những sản phẩm yêu thích của bạn tại đây"
                background={background}
            />
            <ContentRight title="Danh sách sản phẩm yêu thích">
                <>
                    <div className={clsx(styles.productList)}>
                        {!productList.length && !isLoading && <NoData />}
                        {isLoading ? (
                            <Loading count={3} width="calc(33.333% - 30px)" />
                        ) : (
                            productList.map((item) => (
                                <ProductItem
                                    key={item.pro_id}
                                    item={item}
                                    wishList
                                    width="calc(33.333% - 30px)"
                                    handleRemove={handleRemove}
                                    isLoading={isRemove}
                                />
                            ))
                        )}
                    </div>
                    <Pagination
                        page={page}
                        totalPage={totalPage}
                        handleChangePage={handleChangePage}
                    />
                </>
            </ContentRight>
        </>
    );
}

export default WishList;
