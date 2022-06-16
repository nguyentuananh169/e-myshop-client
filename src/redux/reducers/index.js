import { combineReducers } from 'redux';

import productReducer from './products/product';
import categoryProductReducer from './categoryProduct';
import brandProductReducer from './products/brand';
import stateProductReducer from './products/stateProduct';
import toastMessageReducer from './toastMessage';
import addressReducer from './address';
import authReducer from './auth';
import cartReducer from './cart';
import dashboardReducer from './dashboard';
import adminReducer from './admin';
import newsReducer from './news';

const rootReducer = combineReducers({
    product: productReducer,
    stateProduct: stateProductReducer,
    brand: brandProductReducer,
    categoryProduct: categoryProductReducer,
    toastMessage: toastMessageReducer,
    address: addressReducer,
    auth: authReducer,
    cart: cartReducer,
    news: newsReducer,
    dashboard: dashboardReducer,
    admin: adminReducer,
});
export default rootReducer;
