import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productApi from '../../api/productApi';
import ProductItem from '../Home/components/ProductList/ProductItem';
import Loading from '../Home/components/ProductList/ProductItem/Loading';
import NoData from '../../components/NoData';
import TitleBox from '../../components/TitleBox';
import Pagination from '../../components/Pagination';
import styles from './Search.module.css';
function Search() {
    const [isLoading, setLoading] = useState(true);
    const [listProduct, setListProduct] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setToltalPage] = useState(0);
    const [totalProduct, setToltalProduct] = useState(0);
    const { q } = useParams();
    useEffect(() => {
        fetchProductList();
    }, [q]);
    const fetchProductList = async (page = 1, limit = 8) => {
        const params = {
            name: q,
            status: '',
            sortBy: '',
            sortDir: '',
            limit,
            page,
        };
        setLoading(true);
        const response = await productApi.search(params);
        setLoading(false);
        setListProduct(response.dataProduct);
        setPage(response.page);
        setToltalPage(response.totalPage);
        setToltalProduct(response.totalProduct);
    };
    const handleChangePage = (valuePage) => {
        if (valuePage > 0 && valuePage <= totalPage && valuePage !== page) {
            setPage(valuePage);
            fetchProductList(valuePage);
        }
    };
    return (
        <div className="container">
            <TitleBox title={`Kết quả tìm kiếm "${q}" (${totalProduct})`} />
            <div className={clsx(styles.listProduct)}>
                {!isLoading && !listProduct.length && <NoData />}
                {isLoading ? (
                    <Loading count={4} />
                ) : (
                    listProduct.map((item) => <ProductItem key={item.pro_id} item={item} />)
                )}
            </div>
            <Pagination page={page} totalPage={totalPage} handleChangePage={handleChangePage} />
        </div>
    );
}

export default Search;
