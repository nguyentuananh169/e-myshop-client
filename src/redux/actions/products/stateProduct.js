export const setId = (id) =>{
    return{
        type: 'SET_ID',
        payload: id
    }
}
export const setCategoryId = (categoryId) =>{
    return{
        type: 'SET_CATEGORY_ID',
        payload: categoryId
    }
}
export const setBrandId = (brandId) =>{
    return{
        type: 'SET_BRAND_ID',
        payload: brandId
    }
}
export const setName = (name) =>{
    return{
        type: 'SET_NAME',
        payload: name
    }
}
export const setQty = (number) =>{
    return{
        type: 'SET_QTY',
        payload: number
    }
}
export const setPrice = (number) =>{
    return{
        type: 'SET_PRICE',
        payload: number
    }
}
export const setSale = (number) =>{
    return{
        type: 'SET_SALE',
        payload: number
    }
}
export const setImg = (file) =>{
    return{
        type: 'SET_IMG',
        payload: file
    }
}
export const setImgs = (files) =>{
    return{
        type: 'SET_IMGS',
        payload: files
    }
}
export const setStatus = (number) =>{
    return{
        type: 'SET_STATUS',
        payload: number
    }
}
export const setPromotion = (text) =>{
    return{
        type: 'SET_PROMOTION',
        payload: text
    }
}
export const addFormAttribute = (id) =>{
    return{
        type: 'ADD_FORM_ATTRIBUTE',
        payload: id
    }
}
export const deleteFormAttribute = (id) =>{
    return{
        type: 'DELETE_FORM_ATTRIBUTE',
        payload: id
    }
}
export const setAttribute = (index, id, type, value) =>{
    return{
        type: 'SET_ATTRIBUTE',
        payload: {
            index,
            id,
            type,
            value,
        }
    }
}
export const setAttributes = (data) =>{
    return{
        type: 'SET_ATTRIBUTES',
        payload: data
    }
}
export const setDescription = (data) =>{
    return{
        type: 'SET_DESCRIPTION',
        payload: data
    }
}
export const resetStateProduct = () =>{
    return{
        type: 'RESET_STATE_PRODUCT',
        payload: {
            id: "",
            categoryId: "",
            brandId: "",
            name: "",
            qty: "",
            price: "",
            sale: 0,
            img: "",
            imgs: [],
            status: "",
            promotion: [],
            attribute: [],
            description: "",
        }
    }
}