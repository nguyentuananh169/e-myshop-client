const initialState = {
    cartItems: [],
    user: {},
    totalPrice: 0,
};
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NEW_CART':
            const cartItems = [...state.cartItems];
            if (cartItems.length > 0) {
                let dem = 0;
                for (let i = 0; i < cartItems.length; i++) {
                    if (
                        cartItems[i].pro_id === action.payload.pro_id &&
                        cartItems[i].pro_attr === action.payload.pro_attr
                    ) {
                        cartItems[i].pro_qty += action.payload.pro_qty;
                        break;
                    } else {
                        dem++;
                    }
                }
                if (dem === cartItems.length) {
                    cartItems.push(action.payload);
                }
            } else {
                cartItems.push(action.payload);
            }
            const totalPrice = cartItems.reduce(
                (pre, current) => pre + current.pro_qty * current.pro_price,
                0,
            );
            return { ...state, cartItems: cartItems, totalPrice: totalPrice };
        case 'CHANGE_QTY_CART':
            const newCartItems3 = [...state.cartItems];
            for (let i = 0; i < newCartItems3.length; i++) {
                if (newCartItems3[i].id === action.payload.idCart) {
                    newCartItems3[i].pro_qty = Number(action.payload.qty);
                    break;
                }
            }
            const totalPrice3 = newCartItems3.reduce(
                (pre, current) => pre + current.pro_qty * current.pro_price,
                0,
            );
            return { ...state, cartItems: newCartItems3, totalPrice: totalPrice3 };
        case 'REMOVE_CART':
            const newCartItems = state.cartItems.filter((item) => item.id !== action.payload);
            const totalPrice2 = newCartItems.reduce(
                (pre, current) => pre + current.pro_qty * current.pro_price,
                0,
            );
            return { ...state, cartItems: newCartItems, totalPrice: totalPrice2 };
        case 'INFO_USER_CART':
            return { ...state, user: action.payload };
        case 'RESERT_CART':
            return { ...state, cartItems: [], user: {}, totalPrice: 0 };
        default:
            return state;
    }
};
export default cartReducer;
