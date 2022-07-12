import clsx from 'clsx';
import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';
import styles from './Header.module.css';
import noAvt from '../../../../assets/img/icon/no-avatar.jpg';
function Header({ collapse, handleSetShowMenuMobile }) {
    const user = useSelector((state) => state.auth.user);
    const listMenuLeft = [
        { title: 'Trang chủ', to: '/' },
        { title: 'Thông tin', to: '/admin/thong-tin' },
    ];
    const listMenuRight = [
        { icon: 'fa fa-envelope-o', notification: '99' },
        {
            icon: 'fa fa-bell-o',
            notification: '99',
            childrens: [{ title: 'Chưa có dữ liệu', to: '#' }],
        },
        {
            userName: user.user_name,
            level: 'Admin',
            userAvatar: user.user_avatar ? `${user.baseURLImg}${user.user_avatar}` : noAvt,
            childrens: [
                { icon: 'fa fa-user-o', title: 'Thông tin', to: '/bang-dieu-khien/thong-tin' },
                { icon: 'fa fa-envelope-o', title: 'Hộp thư', to: '#' },
                { icon: 'fa fa-bell-o', title: 'Thông báo', to: '#' },
                { icon: 'fa fa-cog', title: 'Cài đặt', to: '#' },
                { icon: 'fa fa-sign-out', title: 'Đăng xuất', to: '/dang-xuat' },
            ],
        },
    ];
    return (
        <div className={clsx(styles.wrapper, { [styles.collapse]: collapse })}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.header)}>
                    <div className={clsx(styles.left)}>
                        <ul>
                            <li
                                className={clsx(styles.iconBarsMobile)}
                                onClick={handleSetShowMenuMobile}
                            >
                                <i className="fa fa-bars"></i>
                            </li>
                            {listMenuLeft.map((item, index) => (
                                <MenuItem key={index} item={item} />
                            ))}
                        </ul>
                    </div>
                    <div className={clsx(styles.right)}>
                        <ul>
                            {listMenuRight.map((item, index) => (
                                <MenuItem key={index} item={item} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
