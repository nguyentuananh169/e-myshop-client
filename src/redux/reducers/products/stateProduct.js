const initialState = {
    id:"",
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
};
const stateProductReducer = (state = initialState, action) => {
    const reg = /("|')/g;
    switch (action.type) {
        case 'SET_ID':
            return {...state, id: action.payload};
        case 'SET_CATEGORY_ID':
            return {...state, categoryId: action.payload, brandId: ""};
        case 'SET_BRAND_ID':
            return {...state, brandId: action.payload};
        case 'SET_NAME':
                return {...state, name: action.payload};
        case 'SET_QTY':
            const convertNumber = +action.payload
            if (Number.isNaN(convertNumber)) {
                return state;
            }
            if(Math.floor(convertNumber) < 0 || convertNumber > 10000000000){
                return {...state, qty: ''};
            }
            return {...state, qty: Math.floor(convertNumber)};
        case 'SET_PRICE':
            const convertNumber2 = +action.payload
            if (Number.isNaN(convertNumber2)) {
                return state;
            }
            if(Math.floor(convertNumber2) < 0 || convertNumber2 > 10000000000){
                return {...state, price: ''};
            }
            return {...state, price: Math.floor(convertNumber2)};
        case 'SET_SALE':
            const convertNumber3 = +action.payload
            if (Number.isNaN(convertNumber3) || convertNumber3 > 100 || convertNumber3 < 0) {
                return state;
            }
            return {...state, sale: Math.floor(convertNumber3)};
        case 'SET_IMG':
            return {...state, img: action.payload};
        case 'SET_IMGS':
            if (action.payload.length > 10) {
                alert('Chỉ được chọn tối đa 10 file ảnh')
                return state;
            }else{
                let convertArray = []
                for (let i = 0; i < action.payload.length; i++) {
                    convertArray.push(action.payload[i])
                }
                return {...state, imgs: convertArray};
            }
        case 'SET_STATUS':
            return {...state, status: action.payload};
        case 'SET_PROMOTION':
            const regStr = action.payload.replace(reg, "'")
            const convertArray2 = regStr.split('|');
            return {...state, promotion: convertArray2};
        case 'ADD_FORM_ATTRIBUTE':
            return {...state, attribute: [...state.attribute, {id: action.payload, type: "", value: []}]};
        case 'DELETE_FORM_ATTRIBUTE':
            const arrayAfterDelete = state.attribute.filter(item => item.id !== action.payload);
            return {...state, attribute: arrayAfterDelete};
        case 'SET_ATTRIBUTE':
            let convertArray3 = [] ;
            if(typeof action.payload.value === 'string'){
                const regStr2 = action.payload.value.replace(reg, "'")
                convertArray3 = regStr2.split('|');
            }
            let attributeItems = [...state.attribute];
            attributeItems[action.payload.index] = {
                ...attributeItems[action.payload.index],
                type: action.payload.type,
                value: convertArray3
            }
            return {...state, attribute: attributeItems}
        case 'SET_ATTRIBUTES':
                return {...state, attribute: [...action.payload]}
        case 'SET_DESCRIPTION':
            return {...state, description: action.payload}
        case 'RESET_STATE_PRODUCT':
            return {...state, ...action.payload}
        default:
            return state;
    }
}
export default stateProductReducer;