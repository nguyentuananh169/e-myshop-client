//Layout
import { DefaultLayout } from '../layout';
//pages
import Home from '../pages/Home';
import Product from '../pages/Product';
import CategoryProduct from '../pages/CategoryProduct';
import News from '../pages/News';
import NewsCatgory from '../pages/News/NewsCategory';
import NewsDetail from '../pages/News/NewsDetail';
import Search from '../pages/Search';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Logout from '../pages/Logout';
import Cart from '../pages/Cart';
import Payment from '../pages/Payment';
import Checkout from '../pages/Checkout';
import CartSubmit from '../pages/CartSubmit';
import Contact from '../pages/Contact';
const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/product/:id', component: Product, layout: DefaultLayout },
    {
        path: '/danh-muc-san-pham/:id',
        component: CategoryProduct,
        layout: DefaultLayout,
    },
    { path: '/tin-tuc', component: News, layout: DefaultLayout },
    { path: '/tin-tuc/danh-muc/:id', component: NewsCatgory, layout: DefaultLayout },
    { path: '/tin-tuc/chi-tiet/:cateId/:newsId', component: NewsDetail, layout: DefaultLayout },
    { path: '/tim-kiem/:q', component: Search, layout: DefaultLayout },
    { path: '/dang-nhap', component: Login, layout: DefaultLayout },
    { path: '/dang-ky', component: Register, layout: DefaultLayout },
    { path: '/dang-xuat', component: Logout, layout: null },
    { path: '/gio-hang', component: Cart, layout: DefaultLayout },
    { path: '/thanh-toan', component: Payment, layout: DefaultLayout },
    { path: '/thu-tuc-thanh-toan', component: Checkout, layout: DefaultLayout },
    { path: '/gio-hang/gui-di/:id/:totalPrice', component: CartSubmit, layout: DefaultLayout },
    { path: '/lien-he', component: Contact, layout: DefaultLayout },
];
export default publicRoutes;
