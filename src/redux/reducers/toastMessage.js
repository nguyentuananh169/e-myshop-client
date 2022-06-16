const initialState = []
const toastMessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NEW_TOAST_MESSAGE':
            const currentArray = [...state]
            if(currentArray.length >= 4){
                currentArray.shift()
                currentArray.push(action.payload)
            }else{
                currentArray.push(action.payload)
            }
            return currentArray
        case 'REMOVE_TOAST_MESSAGE':
            const arrayAfterRmove = state.filter(item => item.id !== action.payload)
            return arrayAfterRmove
        default:
            return state;
    }
}
export default toastMessageReducer;