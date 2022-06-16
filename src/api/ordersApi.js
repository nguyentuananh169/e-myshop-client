import axiosClient from "./axiosClient";

const ordersApi = {
    add: (params) => {
        const url = '/orders/add.php';
        return axiosClient.post(url, params);
    },
    showById: (params) => {
        const url = `/orders/show-by-id.php?_id=${params}`;
        return axiosClient.get(url);
    },
    showByUser: (params) => {
        const url = `/orders/show-by-user.php?_limit=${params.limit}&_page=${params.page}`;
        return axiosClient.get(url);
    },
    changeStatus: (params) => {
        const url = '/orders/change-status.php';
        return axiosClient.post(url, params);
    },
    changeNote: (params) => {
        const url = `/orders/change-note.php?_order_id=${params.id}&_order_note=${params.note}`;
        return axiosClient.get(url);
    },
    showStatus: () => {
        const url = '/orders/show-status.php';
        return axiosClient.post(url);
    },
    showAll: () => {
        const url = '/orders/show.php';
        return axiosClient.get(url);
    },
    search: (params) => {
        const url = `/orders/show.php?_status_id=${params.statusId}&_id=${params.id}&_limit=${params.limit}&_page=${params.page}`;
        return axiosClient.get(url);
    },
    statistical: () => {
        const url = `/orders/statistical.php`;
        return axiosClient.get(url);
    }
}
export default ordersApi;