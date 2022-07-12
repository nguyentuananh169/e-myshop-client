import axiosClient from './axiosClient';

const commentsApi = {
    showAll: (params) => {
        const url = `/comments/show-all.php?_page=${params.page}&_limit=${params.limit}`;
        return axiosClient.get(url);
    },
    add: (params) => {
        const url = '/comments/add.php';
        return axiosClient.post(url, params);
    },
    showByProId: (params) => {
        const url = `/comments/show-by-pro-id.php?_pro_id=${params.pro_id}&_page=${params.page}&_limit=${params.limit}`;
        return axiosClient.get(url);
    },
    showByUserId: (params) => {
        const url = `/comments/show-by-user-id.php?_page=${params.page}&_limit=${params.limit}`;
        return axiosClient.get(url);
    },
};
export default commentsApi;
