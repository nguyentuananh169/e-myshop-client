import axiosClient from "./axiosClient";

const wishListApi = {
    wish: (params) => {
        const url = `/wish-list/wish.php?_id=${params}`;
        return axiosClient.get(url);
    },
    getByUser: (params) => {
        const url = `/wish-list/show-by-user.php?_limit=${params.limit}&_page=${params.page}`;
        return axiosClient.get(url);
    },
}
export default wishListApi;