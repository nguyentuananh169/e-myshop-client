import axiosClient from './axiosClient';

const bannerHomeApi = {
    getAll: () => {
        const url = '/banners/home/show.php';
        return axiosClient.get(url);
    },
    search: (params) => {
        const url = `/banners/home/show.php?_page=${params.page}&&_limit=${params.limit}`;
        return axiosClient.get(url);
    },
    add: (params) => {
        const url = '/banners/home/add.php';
        return axiosClient.post(url, params);
    },
    update: (params) => {
        const url = '/banners/home/update.php';
        return axiosClient.post(url, params);
    },
    delete: (params) => {
        const url = `/banners/home/delete.php?_id=${params}`;
        return axiosClient.get(url);
    },
};
export default bannerHomeApi;
