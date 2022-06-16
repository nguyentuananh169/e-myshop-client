import axiosClient from "./axiosClient";

const userApi = {
    add: (params) => {
        const url = "/users/add.php";
        return axiosClient.post(url, params);
    },
    getAll: (params) => {
        const url = `/users/show.php?_page=${params.page}&_limit=${params.limit}&_email=${params.email}&_level=${params.level}`;
        return axiosClient.get(url);
    },
    getById: () => {
        const url = `/users/show-info-user.php`;
        return axiosClient.get(url);
    },
    delete: (params) => {
        const url = `/users/delete.php?_id=${params}`;
        return axiosClient.get(url);
    },
    changeLevel: (params) => {
        const url = `/users/change-level.php`;
        return axiosClient.post(url, params);
    },
    changeStatus: (params) => {
        const url = `/users/change-status.php`;
        return axiosClient.post(url, params);
    },
    changeAvatar: (params) => {
        const url = `/users/change-avatar.php`;
        return axiosClient.post(url, params);
    },
    update: (params) => {
        const url = `/users/update.php`;
        return axiosClient.post(url, params);
    },
    statistical: () => {
        const url = `/users/statistical.php`;
        return axiosClient.get(url);
    },
}
export default userApi;