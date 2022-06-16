import brandProductApi from "../../../api/brandProductApi"

export const getBrandProductByCategoryId = (payload) =>{
    return{
        type: 'GET_BRAND_PRODUCT_BY_CATEGORY_ID',
        payload
    }
}
export const getBrandByCateId = (cateId) => {
    return async dispatch => {
        if(cateId){
            try {
                const response = await brandProductApi.getCateId(cateId)
                dispatch(getBrandProductByCategoryId(response.dataBrand))
            } catch (error) {
                console.log('ERROR: ', error)
            }
        }else{
            dispatch(getBrandProductByCategoryId([]))
        }
    }
}