const initialState = {
    totalCate: '',
    totalPage: '',
    page: '',
    limit: '',
    isLoading: false,
    dataCate: [],
};
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_CATEGORY_PRODUCT':
            return { ...state, dataCate: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};
export default productReducer;
