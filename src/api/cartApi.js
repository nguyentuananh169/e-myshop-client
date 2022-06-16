import axiosClient from "./axiosClient";

const cartApi = {
    changeQtyCart: (params) => {
        const url = '/cart/change-qty-cart.php';
        return axiosClient.post(url, params);
    }
}
export default cartApi;