import addressApi from "../../api/addressApi"

const showCity = (response) =>{
    return{
        type: 'SHOW_CITY',
        payload: response
    }
}
export const fetchCity = () =>{
    return async dispatch =>{
        const response = await addressApi.getCity()
        dispatch(showCity(response))
    }
}
const showDistrict = (response) =>{
    return{
        type: 'SHOW_DISTRICT',
        payload: response
    }
}
export const fetchDistrict = (CityId) =>{
    return async dispatch =>{
        const response = await addressApi.getDistrictByCityId(CityId)
        dispatch(showDistrict(response))
    }
}
const showCommune = (response) =>{
    return{
        type: 'SHOW_COMMUNE',
        payload: response
    }
}
export const fetchCommune = (districtId) =>{
    return async dispatch =>{
        const response = await addressApi.getCommuneByDistrictId(districtId)
        dispatch(showCommune(response))
    }
}