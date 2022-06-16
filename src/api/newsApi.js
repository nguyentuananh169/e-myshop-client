import axiosClient from './axiosClient';

const newsApi = {
    getAll: (params) => {
        const url = `/news/news/show.php?_page=${params.page}&_limit=${params.limit}`;
        return axiosClient.get(url);
    },
    getByStatus: (params) => {
        const url = `/news/news/show-by-status.php?_page=${params.page}&_limit=${params.limit}`;
        return axiosClient.get(url);
    },
    getByViewsTop: (params) => {
        const url = `/news/news/show-by-views.php?_page=${params.page}&_limit=${params.limit}`;
        return axiosClient.get(url);
    },
    getById: (params) => {
        const url = `/news/news/show-by-id.php?_id=${params}`;
        return axiosClient.get(url);
    },
    getByCategory: (params) => {
        const url = `/news/news/show-by-category.php?_category=${params.category}&_limit=${params.limit}&_page=${params.page}`;
        return axiosClient.get(url);
    },
    update: (params) => {
        const url = '/news/news/update.php';
        return axiosClient.post(url, params);
    },
    updateViews: (params) => {
        const url = '/news/news/update-views.php';
        return axiosClient.post(url, params);
    },
    changeStatus: (params) => {
        const url = `/news/news/change-status.php?_id=${params}`;
        return axiosClient.get(url);
    },
    delete: (params) => {
        const url = `/news/news/delete.php?_id=${params}`;
        return axiosClient.get(url);
    },
    add: (params) => {
        const url = '/news/news/add.php';
        return axiosClient.post(url, params);
    },
    search: (params) => {
        const url = `/news/news/show.php?_title=${params.title}&_category=${params.category}&_limit=${params.limit}&_page=${params.page}`;
        return axiosClient.get(url, params);
    },
    statistical: () => {
        const url = '/news/news/statistical.php';
        return axiosClient.get(url);
    },
};
export default newsApi;
