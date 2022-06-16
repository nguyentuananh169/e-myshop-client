import axiosClient from "./axiosClient";

const categoryNewsApi = {
    getAll: () => {
        const url = "/news/category/show.php";
        return axiosClient.get(url);
    },
    getByStatus: () => {
        const url = "/news/category/show-by-status.php";
        return axiosClient.get(url);
    },
    update: (params) => {
        const url = "/news/category/update.php";
        return axiosClient.post(url, params);
    },
    changeStatus: (params) => {
        const url = `/news/category/change-status.php?_id=${params}`;
        return axiosClient.get(url);
    },
    delete: (params) => {
        const url = `/news/category/delete.php?_id=${params}`;
        return axiosClient.get(url);
    },
    add: (params) => {
        const url = "/news/category/add.php";
        return axiosClient.post(url, params);
    },
    search: (params) => {
        const url = `/news/category/show.php?_name=${params.name}&_status=${params.status}&_limit=${params.limit}&_page=${params.page}`;
        return axiosClient.get(url);
    },
}
export default categoryNewsApi;