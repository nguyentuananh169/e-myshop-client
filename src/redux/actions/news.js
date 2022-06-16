import categoryNewsApi from "../../api/categoryNewsApi";

const showNewsByStatus = (response) =>{
    return {
        type: 'SHOW_NEWS_BY_STATUS',
        payload: response
    }
}
export const fetchNewsByStatus = () => {
    return async dispatch =>{
        const response = await categoryNewsApi.getByStatus()
        dispatch(showNewsByStatus(response))
    }
}