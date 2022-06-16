const initialState = {
    totalBrand: "",
    totalPage: "",
    page: "",
    limit: "",
    dataBrand: []
  }
const brandProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BRAND_PRODUCT_BY_CATEGORY_ID':
            return {...state,dataBrand: action.payload};
        default:
            return state;
    }
}
export default brandProductReducer;