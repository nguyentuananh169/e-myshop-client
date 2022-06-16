import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import ProductItem from './ProductItem';
import Loading from './ProductItem/Loading';
import TitleBox from '../../../../components/TitleBox';
import productApi from '../../../../api/productApi';
import Pagination from '../../../../components/Pagination';
import styles from './Product.module.css';
import FilterBox from './FilterBox';
import NoData from '../../../../components/NoData';
const ProductList = ({ categoryId, categoryName, search = false, pagination = false }) => {
    const [isLoading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [filter, setFilter] = useState({ brand: '', price: '', sale: '', status: '' });
    const [sort, setSort] = useState({ sortBy: '', sortDir: '' });
    useEffect(() => {
        if (categoryId) {
            fetchProductList();
        }
    }, [categoryId]);
    const fetchProductList = async (valueParams = {}) => {
        const params = {
            category: categoryId,
            brand: valueParams.brand || '',
            price: valueParams.price || '',
            sale: valueParams.sale || '',
            status: valueParams.status || '',
            sortBy: valueParams.sortBy || '',
            sortDir: valueParams.sortDir || '',
            limit: valueParams.limit || 8,
            page: valueParams.page || 1,
        };
        setLoading(true);
        const response = await productApi.getByCategory(params);
        setLoading(false);
        setProductList(response.dataProduct);
        setPage(response.page);
        setTotalPage(response.totalPage);
    };
    const handleSetFilter = (object) => {
        setFilter(object);
    };
    const handleChangeSort = (sortBy) => {
        let tempObject = { sortBy: sortBy.by, sortDir: sortBy.dir };
        setSort(tempObject);
        fetchProductList({ ...filter, ...tempObject });
    };
    const handleChangePage = (valuePage) => {
        if (valuePage > 0 && valuePage <= totalPage && valuePage !== page) {
            setPage(valuePage);
            fetchProductList({ ...filter, ...sort, page: valuePage });
        }
    };
    return (
        <div className="container">
            <TitleBox title={categoryName} />
            {search && (
                <FilterBox
                    fetchProductList={fetchProductList}
                    categoryId={categoryId}
                    filter={filter}
                    sort={sort}
                    handleSetFilter={handleSetFilter}
                    handleChangeSort={handleChangeSort}
                />
            )}
            <div className={clsx(styles.listProduct)}>
                {!isLoading && !productList.length && <NoData />}
                {isLoading ? (
                    <Loading count={4} />
                ) : (
                    productList.map((item) => <ProductItem key={item.pro_id} item={item} />)
                )}
            </div>
            {pagination && (
                <Pagination page={page} totalPage={totalPage} handleChangePage={handleChangePage} />
            )}
        </div>
    );
};
export default ProductList;
