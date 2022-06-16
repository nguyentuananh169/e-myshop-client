//Layout
import { DashboardLayout } from '../layout';
//pages
import Dashboard from '../pages/Dashboard';
import UserInfo from '../pages/Dashboard/UserInfo';
import Order from '../pages/Dashboard/Order';
import OrderDetail from '../pages/Dashboard/Order/OrderDetail';
import WishList from '../pages/Dashboard/WishList';
import Comments from '../pages/Dashboard/Comments';
import Rating from '../pages/Dashboard/Rating';
const dashboardRoutes = [
    { path: '/bang-dieu-khien', component: Dashboard, layout: DashboardLayout },
    { path: '/bang-dieu-khien/thong-tin', component: UserInfo, layout: DashboardLayout },
    { path: '/bang-dieu-khien/don-hang', component: Order, layout: DashboardLayout },
    { path: '/bang-dieu-khien/don-hang/:id', component: OrderDetail, layout: null },
    { path: '/bang-dieu-khien/san-pham-yeu-thich', component: WishList, layout: DashboardLayout },
    { path: '/bang-dieu-khien/quan-ly-binh-luan', component: Comments, layout: DashboardLayout },
    { path: '/bang-dieu-khien/quan-ly-danh-gia', component: Rating, layout: DashboardLayout },
];
export default dashboardRoutes;
