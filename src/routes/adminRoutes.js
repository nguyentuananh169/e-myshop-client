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
import News from '../pages/Admin/News';
import Comments from '../pages/Admin/Comments';
import Rating from '../pages/Admin/Rating';
import Contact from '../pages/Admin/Contact';
import BannerHome from '../pages/Admin/BannerHome';

const dashboardRoutes = [
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/admin/danh-muc-san-pham', component: CatgoryProduct, layout: AdminLayout },
    { path: '/admin/san-pham', component: Product, layout: AdminLayout },
    { path: '/admin/thuong-hieu-san-pham', component: BrandProduct, layout: AdminLayout },
    { path: '/admin/don-hang', component: Orders, layout: AdminLayout },
    { path: '/admin/nguoi-dung', component: Users, layout: AdminLayout },
    { path: '/admin/danh-muc-tin-tuc', component: CategoryNews, layout: AdminLayout },
    { path: '/admin/tin-tuc', component: News, layout: AdminLayout },
    { path: '/admin/binh-luan', component: Comments, layout: AdminLayout },
    { path: '/admin/danh-gia', component: Rating, layout: AdminLayout },
    { path: '/admin/lien-he', component: Contact, layout: AdminLayout },
    { path: '/admin/banner-trang-chu', component: BannerHome, layout: AdminLayout },
];
export default dashboardRoutes;
