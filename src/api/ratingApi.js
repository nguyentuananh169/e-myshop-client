import axiosClient from "./axiosClient";

const cartApi = {
    showAll: (params) => {
        const url = `/rating/show-all.php?_page=${params.page}&_limit=${params.limit}`;
        return axiosClient.get(url);
    },
    show: (params) => {
        const url = `/rating/show.php?_pro_id=${params.pro_id}&_page=${params.page}&_limit=${params.limit}`;
        return axiosClient.get(url);
    },
    showByUserId: (params) => {
        const url = `/rating/show-by-user-id.php?_page=${params.page}&_limit=${params.limit}`;
        return axiosClient.get(url);
    },
    showByStatus: (params) => {
        const url = `/rating/show-by-status.php?_status=${params}`;
        return axiosClient.get(url);
    },
    add: (params) => {
        const url = '/rating/add.php';
        return axiosClient.post(url, params);
    },
    changeStatus: (params) => {
        const url = `/rating/change-status.php?_id=${params}`;
        return axiosClient.get(url);
    },
}
export default cartApi;