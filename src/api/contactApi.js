import axiosClient from "./axiosClient";

const contactApi = {
    add: (params) => {
        const url = '/contact/add.php';
        return axiosClient.post(url, params);
    },
    getAll: (params) => {
        const url = `/contact/show-all.php?_page=${params.page}&_limit=${params.limit}`;
        return axiosClient.get(url);
    },
    search: (params) => {
        const url = `/contact/search.php?_email=${params.email}&_status=${params.status}&_page=${params.page}&_limit=${params.limit}`;
        return axiosClient.get(url);
    },
    reply: (params) => {
        const url = '/contact/reply.php';
        return axiosClient.post(url, params);
    },
}
export default contactApi;