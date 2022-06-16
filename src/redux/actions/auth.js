import authApi from '../../api/authApi';
export const checkLogin = (response) => {
    return {
        type: 'CHECK_LOGIN',
        payload: response,
    };
};
export const authLogin = (response) => {
    return {
        type: 'AUTH_LOGIN',
        payload: response,
    };
};
export const checkAuthLogin = () => {
    return async (dispatch) => {
        const response = await authApi.checkLogin();
        if (response[0].error === 1) {
            dispatch(
                authLogin({
                    access_token: null,
                    user: null,
                    isAuthentication: false,
                    isAdmin: false,
                    baseURLImg: null,
                }),
            );
            localStorage.removeItem('access_token');
        }
        if (response[0].error === 0) {
            dispatch(
                authLogin({
                    access_token: response[0].access_token,
                    user: response[0].user,
                    isAuthentication: response[0].auth,
                    isAdmin: response[0].admin,
                    baseURLImg: response[0].baseURLImg,
                }),
            );
        }
        dispatch(checkLogin(false));
    };
};
export const changeInfoUser = (response) => {
    return {
        type: 'CHANGE_INFO_USER',
        payload: response,
    };
};
export const logOut = () => {
    return {
        type: 'LOG_OUT',
        payload: null,
    };
};
