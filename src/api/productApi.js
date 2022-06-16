import axiosClient from './axiosClient';

const productApi = {
    add: (params) => {
        const url = '/products/product/add.php';
        return axiosClient.post(url, params);
    },
    getAll: (params) => {
        const url = `/products/product/show.php?_limit=${params.limit}&_page=${params.page}`;
        return axiosClient.get(url);
    },
    getById: (params) => {
        const url = `/products/product/show.php?_id=${params}`;
        return axiosClient.get(url);
    },
    getByCategory: (params) => {
        const url = `/products/product/show-by-category.php?_category=${params.category}&_brand=${params.brand}&_price=${params.price}&_sale=${params.sale}&_status=${params.status}&_limit=${params.limit}&_page=${params.page}&_sort_by=${params.sortBy}&_sort_dir=${params.sortDir}`;
        return axiosClient.get(url);
    },
    delete: (params) => {
        const url = `/products/product/delete.php?_id=${params}`;
        return axiosClient.get(url);
    },
    update: (params) => {
        const url = '/products/product/update.php';
        return axiosClient.post(url, params);
    },
    changeStatus: (params) => {
        const url = `/products/product/change-status.php?_id=${params.id}&_status=${params.status}`;
        return axiosClient.get(url);
    },
    search: (params) => {
        const url = `/products/product/show.php?_name=${params.name}&_status=${params.status}&_sort_by=${params.sortBy}&_sort_dir=${params.sortDir}&_limit=${params.limit}&_page=${params.page}`;
        return axiosClient.get(url);
    },
    statistical: () => {
        const url = `/products/product/statistical.php`;
        return axiosClient.get(url);
    },
};
export default productApi;
