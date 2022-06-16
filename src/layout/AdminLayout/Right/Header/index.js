import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import noAvt from '../../../../assets/img/icon/no-avatar.jpg';
function Header() {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.header)}>
                    <div className={clsx(styles.left)}>
                        <ul>
                            <li className={clsx(styles.iconBarsMobile)}>
                                <i className="fa fa-bars"></i>
                            </li>
                            <li>
                                <Link to="/">Trang chủ</Link>
                            </li>
                            <li>
                                <Link to="/admin/thong-tin">Thông tin</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={clsx(styles.right)}>
                        <ul>
                            <li>
                                <label>
                                    <i className="fa fa-search"></i>
                                </label>
                            </li>
                            <li className={clsx(styles.dropdownMenu)}>
                                <label>
                                    <i className="fa fa-envelope-o"></i>
                                    <span className={clsx(styles.small)}>22</span>
                                </label>
                                <ul className={clsx(styles.subMenu)}>
                                    <li>
                                        <Link to="#">Chưa có dữ liệu</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={clsx(styles.dropdownMenu)}>
                                <label>
                                    <i className="fa fa-bell-o"></i>{' '}
                                    {/*có thông báo thêm class bell*/}
                                    <span className={clsx(styles.small)}>5</span>
                                </label>
                                <ul className={clsx(styles.subMenu)}>
                                    <li>
                                        <Link to="#">Chưa có dữ liệu</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={clsx(styles.dropdownMenu)}>
                                <label>
                                    <div className={clsx(styles.text)}>
                                        <strong>
                                            {user && user.user_name ? user.user_name : ''}
                                        </strong>
                                        <p>Admin</p>
                                    </div>
                                    <div className={clsx(styles.avatar)}>
                                        <img
                                            src={
                                                user && user.user_avatar
                                                    ? `${user.baseURLImg}${user.user_avatar}`
                                                    : noAvt
                                            }
                                            alt=""
                                        />
                                    </div>
                                </label>
                                <ul className={clsx(styles.subMenu)}>
                                    <li>
                                        <Link to="/admin/thong-tin">
                                            <i className="fa fa-user-o"></i>Thông tin
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="fa fa-envelope-o"></i>Hộp thư
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="fa fa-bell-o"></i>Thông báo
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="fa fa-cog"></i>Cài đặt
                                        </Link>
                                    </li>
                                    <li className={clsx(styles.borderTop)}>
                                        <Link to="/dang-xuat">
                                            <i className="fa fa-sign-out"></i>Đăng xuất
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
