const initialState = {
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
                isAuthentication: action.payload.isAuthentication,
                isAdmin: action.payload.isAdmin,
            };
        case 'CHANGE_INFO_USER':
            return { ...state, user: action.payload };
        case 'LOG_OUT':
            return {
                isCheckLogin: false,
                user: null,
                isAuthentication: false,
                isAdmin: false,
            };
        case 'CHECK_LOGIN':
            return {
                ...state,
                isCheckLogin: action.payload,
            };
        default:
            return state;
    }
};
export default authReducer;
