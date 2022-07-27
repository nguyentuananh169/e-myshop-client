import clsx from 'clsx';
import styles from './Menu.module.css';
import MenuItem from './MenuItem';
function Menu({ collapse }) {
    const listMenu = [
        {
            icon: 'fa fa-home',
            title: 'Trang chủ',
            path: '/admin',
        },
        {
            title: 'Quản lý ứng dụng',
        },
        {
            icon: 'fa fa-database',
            title: 'Quản lý sản phẩm',
            childrens: [
                {
                    icon: 'fa fa-circle-o',
                    title: 'Danh mục sản phẩm',
                    path: '/admin/danh-muc-san-pham',
                },
                {
                    icon: 'fa fa-circle-o',
                    title: 'Sản phẩm',
                    path: '/admin/san-pham',
                },
                {
                    icon: 'fa fa-circle-o',
                    title: 'Thương hiệu sản phẩm',
                    path: '/admin/thuong-hieu-san-pham',
                },
            ],
        },
        { icon: 'fa fa-shopping-bag', title: 'Quản lý đơn hàng', path: '/admin/don-hang' },
        { icon: 'fa fa-users', title: 'Quản lý người dùng', path: '/admin/nguoi-dung' },
        {
            icon: 'fa fa-newspaper-o',
            title: 'Quản lý tin tức',
            childrens: [
                {
                    icon: 'fa fa-circle-o',
                    title: 'Danh mục tin tức',
                    path: '/admin/danh-muc-tin-tuc',
                },
                {
                    icon: 'fa fa-circle-o',
                    title: 'Tin tức',
                    path: '/admin/tin-tuc',
                },
            ],
        },
        {
            icon: 'fa fa-comments',
            title: 'Quản lý bình luận',
            childrens: [
                {
                    icon: 'fa fa-circle-o',
                    title: 'Bình luận',
                    path: '/admin/binh-luan',
                },
                {
                    icon: 'fa fa-circle-o',
                    title: 'Đánh giá',
                    path: '/admin/danh-gia',
                },
            ],
        },
        { icon: 'fa fa-compress', title: 'Quản lý liên hệ', path: '/admin/lien-he' },
        { title: 'Giao diện người dùng' },
        {
            icon: 'fa fa-picture-o',
            title: 'Quản lý banner',
            childrens: [
                {
                    icon: 'fa fa-circle-o',
                    title: 'Banner trang chủ',
                    path: '/admin/banner-trang-chu',
                },
                {
                    icon: 'fa fa-circle-o',
                    title: 'Banner tin tức',
                    path: '/admin/banner-tin-tuc',
                },
            ],
        },
    ];
    return (
        <div className={clsx(styles.wrapper, { [styles.collapse]: collapse }, 'custom-scrollbars')}>
            <ul>
                {listMenu.map((item, index) => (
                    <MenuItem key={index} item={item} collapse={collapse} />
                ))}
            </ul>
        </div>
    );
}

export default Menu;
