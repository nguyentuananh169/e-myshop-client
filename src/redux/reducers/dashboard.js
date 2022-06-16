const initialState = {
    showMenu: false
}
const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MENU_DASHBOARD':
            return {...state, showMenu: action.payload}
        default:
            return state
    }
}
export default dashboardReducer;