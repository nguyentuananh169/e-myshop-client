const initialState = {
    categoryNewsList: [],
}
const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_NEWS_BY_STATUS':
            return {
                ...state, 
                categoryNewsList: action.payload
            }
        default:
            return state
    }
}
export default newsReducer