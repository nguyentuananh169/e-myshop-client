import axiosClient from './axiosClient';

const authApi = {
    loginAdmin: (params) => {
        const url = '/login/login-admin.php';
        return axiosClient.post(url, params);
    },
    loginMember: (params) => {
        const url = '/login/login-member.php';
        return axiosClient.post(url, params);
    },
    checkLogin: () => {
        const url = '/login/check-login.php';
        return axiosClient.post(url);
    },
    refreshToken: () => {
        const url = '/refresh_token.php';
        return axiosClient.post(url);
    },
};
export default authApi;
