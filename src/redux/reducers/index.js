import { combineReducers } from 'redux';

import categoryProductReducer from './categoryProduct';
import toastMessageReducer from './toastMessage';
import authReducer from './auth';
import cartReducer from './cart';

const rootReducer = combineReducers({
    categoryProduct: categoryProductReducer,
    toastMessage: toastMessageReducer,
    auth: authReducer,
    cart: cartReducer,
});
export default rootReducer;
