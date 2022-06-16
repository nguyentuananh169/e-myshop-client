import categoryProductApi from '../../api/categoryProductApi';

export const setLoading = (payload) => {
    return {
        type: 'SET_LOADING',
        payload,
    };
};
export const showCategoryProduct = (payload) => {
    return {
        type: 'SHOW_CATEGORY_PRODUCT',
        payload,
    };
};
export const fetchCategoryProducts = () => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const response = await categoryProductApi.getAll();
        dispatch(showCategoryProduct(response));
        dispatch(setLoading(false));
    };
};
