//Layout
import { AdminLayout } from '../layout';
//pages
import Admin from '../pages/Admin';
import CatgoryProduct from '../pages/Admin/categoryProduct';
import Product from '../pages/Admin/Product';
import BrandProduct from '../pages/Admin/brandProduct';
import Orders from '../pages/Admin/Orders';
import Users from '../pages/Admin/Users';
import CategoryNews from '../pages/Admin/CategoryNews';

const dashboardRoutes = [
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/admin/danh-muc-san-pham', component: CatgoryProduct, layout: AdminLayout },
    { path: '/admin/san-pham', component: Product, layout: AdminLayout },
    { path: 'admin/thuong-hieu-san-pham', component: BrandProduct, layout: AdminLayout },
    { path: 'admin/don-hang', component: Orders, layout: AdminLayout },
    { path: 'admin/nguoi-dung', component: Users, layout: AdminLayout },
    { path: 'admin/danh-muc-tin-tuc', component: CategoryNews, layout: AdminLayout },
];
export default dashboardRoutes;
