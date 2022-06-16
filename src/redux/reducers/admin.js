const initialState = {
    showMenu: false
}
const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MENU_ADMIN':
            return {...state, showMenu: action.payload}
        default:
            return state
    }
}
export default addressReducer