import axiosClient from "./axiosClient";

const brandProductApi = {
    add: (params) => {
        const url = "/products/brand/add.php";
        return axiosClient.post(url, params);
    },
    getAll: (params) => {
        const url = "/products/brand/show.php";
        return axiosClient.get(url, params);
    },
    getCateId: (params) => {
        const url = `/products/brand/show.php?_cate_id=${params}`;
        return axiosClient.get(url);
    },
    delete: (params) => {
        const url = `/products/brand/delete.php?_id=${params}`;
        return axiosClient.get(url);
    },
    update: (params) => {
        const url = "/products/brand/update.php";
        return axiosClient.post(url, params);
    },
    search: (params) => {
        const url = `/products/brand/show.php?_name=${params.name}&_cate_id=${params.cateId}&_limit=${params.limit}&_page=${params.page}`;
        return axiosClient.get(url, params);
    },
}
export default brandProductApi;