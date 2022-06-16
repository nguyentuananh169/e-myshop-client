import axiosClient from "./axiosClient";

const categoryProductApi = {
    getAll: () => {
        const url = "/products/category/show-all.php";
        return axiosClient.get(url);
    },
    getByStatus: (params) => {
        const url = `/products/category/show-by-status.php?_status=${params}`;
        return axiosClient.get(url);
    },
    getById: (params) => {
        const url = `/products/category/show-by-id.php?_id=${params}`;
        return axiosClient.get(url);
    },
    update: (params) => {
        const url = "/products/category/update.php";
        return axiosClient.post(url, params);
    },
    changeStatus: (params) => {
        const url = `/products/category/change-status.php?_id=${params}`;
        return axiosClient.get(url);
    },
    delete: (params) => {
        const url = `/products/category/delete.php?_id=${params}`;
        return axiosClient.get(url);
    },
    add: (params) => {
        const url = "/products/category/add.php";
        return axiosClient.post(url, params);
    },
    search: (params) => {
        const url = `/products/category/show.php?_name=${params.name}&_status=${params.status}&_limit=${params.limit}&_page=${params.page}`;
        return axiosClient.get(url);
    },
}
export default categoryProductApi;