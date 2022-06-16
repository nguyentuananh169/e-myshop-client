import axios from 'axios';
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    config.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'));
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // handle error ...
        throw error;
    },
);
export default axiosClient;
