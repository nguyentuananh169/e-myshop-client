import clsx from 'clsx';
import { useEffect, useState } from 'react';
import newsApi from '../../api/newsApi';
import Path from '../../components/Path';
import LayoutLeft from './Components/LayoutLeft';
import LayoutRight from './Components/LayoutRight';
import Pagination from '../../components/Pagination';
import styles from './News.module.css';
import NewsItem from './Components/NewsItem';
import ProductItem from './Components/ProductItem';
import Loading from './Components/NewsItem/Loading';
import Loading2 from './Components/ProductItem/Loading';
import NoData from '../../components/NoData';
import productApi from '../../api/productApi';
function News() {
    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [newsList, setNewsList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setToltalPage] = useState(0);
    useEffect(() => {
        const fetchProduct = async () => {
            const params = { name: '', status: 2, sortBy: '', sortDir: '', limit: 4, page: 1 };
            setLoading2(true);
            const response = await productApi.search(params);
            setLoading2(false);
            setProductList(response.dataProduct);
        };
        fetchProduct();
        fetchNews();
    }, []);
    const fetchNews = async (page = 1, limit = 4) => {
        const params = { page, limit };
        setLoading(true);
        const response = await newsApi.getByStatus(params);
        setLoading(false);
        setNewsList(response.dataNews);
        setPage(response.page);
        setToltalPage(response.totalPage);
    };
    const handleChangePage = (valuePage) => {
        if (valuePage > 0 && valuePage <= totalPage && valuePage !== page) {
            fetchNews(valuePage);
        }
    };
    const path = [
        {
            name: 'Tin tức',
            url: '/tin-tuc',
        },
    ];
    return (
        <>
            <Path path={path} />
            <div className="container">
                <div className={clsx(styles.wrapper)}>
                    <>
                        <LayoutLeft>
                            {!isLoading && !newsList.length && (
                                <NoData text="Chưa có bài viết nào..." />
                            )}
                            {isLoading ? (
                                <Loading count={4} />
                            ) : (
                                newsList.map((item, index) => <NewsItem key={index} item={item} />)
                            )}
                            <Pagination
                                page={page}
                                totalPage={totalPage}
                                handleChangePage={handleChangePage}
                            />
                        </LayoutLeft>
                        <LayoutRight>
                            {!isLoading2 && !productList.length && (
                                <NoData text="Chưa có sản phẩm nào nổi bật ..." />
                            )}
                            {isLoading2 ? (
                                <Loading2 count={4} />
                            ) : (
                                productList.map((item, index) => (
                                    <ProductItem key={index} item={item} />
                                ))
                            )}
                        </LayoutRight>
                    </>
                </div>
            </div>
        </>
    );
}

export default News;
