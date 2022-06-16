import axiosClient from "./axiosClient";

const addressApi = {
    getCity: () => {
        const url = "/address/show-city.php";
        return axiosClient.get(url);
    },
    getDistrictByCityId: (cityId) => {
        const url = `/address/show-district.php?_city_id=${cityId}`;
        return axiosClient.get(url);
    },
    getCommuneByDistrictId: (districtId) => {
        const url = `/address/show-commune.php?_district_id=${districtId}`;
        return axiosClient.get(url);
    },
}
export default addressApi;