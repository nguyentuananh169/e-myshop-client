const initialState = {
    access_token: null,
    user: null,
    isAuthentication: false,
    isAdmin: false,
    isCheckLogin: true,
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_LOGIN':
            return {
                ...state,
                user: action.payload.user,
                access_token: action.payload.access_token,
                isAuthentication: action.payload.isAuthentication,
                isAdmin: action.payload.isAdmin,
            };
        case 'CHANGE_INFO_USER':
            return { ...state, user: action.payload };
        case 'LOG_OUT':
            return {
                ...state,
                access_token: null,
                user: null,
                isAuthentication: false,
                isAdmin: false,
            };
        case 'CHECK_LOGIN':
            return {
                ...state,
                isCheckLogin: action.payload,
            };
        case 'CHANGE_INFO_USER':
        default:
            return state;
    }
};
export default authReducer;
