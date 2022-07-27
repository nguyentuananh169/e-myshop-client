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
        dispatch(
            authLogin({
                user: response[0]?.user || null,
                isAuthentication: response[0]?.auth || null,
                isAdmin: response[0]?.admin || null,
            }),
        );
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
