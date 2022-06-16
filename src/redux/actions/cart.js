export const addNewCart = (product) =>{
    return{
        type: 'ADD_NEW_CART',
        payload: product
    }
}
export const changeQtyCart = (qty, idCart) =>{
    return{
        type: 'CHANGE_QTY_CART',
        payload: {
            qty, 
            idCart
        }
    }
}
export const infoUserCart = (user) =>{
    return{
        type: 'INFO_USER_CART',
        payload: user
    }
}
export const removeCart = (id) =>{
    return{
        type: 'REMOVE_CART',
        payload: id
    }
}
export const resertCart = () =>{
    return{
        type: 'RESERT_CART',
        payload: null
    }
}