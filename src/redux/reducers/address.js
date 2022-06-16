const initialState = {
    city:[],
    district:[],
    commune:[],
}
const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_CITY':
            return {...state, city: action.payload}
        case 'SHOW_DISTRICT':
            return {...state, district: action.payload}
        case 'SHOW_COMMUNE':
            return {...state, commune: action.payload}
        default:
            return state
    }
}
export default addressReducer