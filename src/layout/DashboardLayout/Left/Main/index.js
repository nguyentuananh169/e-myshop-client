import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Main.module.css';
function Main({ handleSetShowMenu }) {
    const location = useLocation();
    useEffect(() => {
        handleSetShowMenu(false);
    }, [location.pathname]);
    return (
        <div className={clsx(styles.wrapper, 'custom-scrollbars')}>
            <ul>
                <li className={clsx(styles.home)}>
                    <NavLink
                        end
                        to="/"
                        className={(nav) => clsx({ [styles.active]: nav.isActive })}
                    >
                        <i className="fa fa-home"></i>
                        Trang chủ
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/bang-dieu-khien"
                        end
                        className={(nav) => clsx({ [styles.active]: nav.isActive })}
                    >
                        <i className="fa fa-tachometer"></i>
                        Bảng điều khiển
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/bang-dieu-khien/thong-tin"
                        className={(nav) => clsx({ [styles.active]: nav.isActive })}
                    >
                        <i className="fa fa-user-circle-o"></i>
                        Thông tin tài khoản
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/bang-dieu-khien/don-hang"
                        className={(nav) => clsx({ [styles.active]: nav.isActive })}
                    >
                        <i className="fa fa-shopping-basket"></i>
                        Đơn hàng của bạn
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/bang-dieu-khien/san-pham-yeu-thich"
                        className={(nav) => clsx({ [styles.active]: nav.isActive })}
                    >
                        <i className="fa fa-heart-o"></i>
                        Sản phẩm yêu thích
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/bang-dieu-khien/quan-ly-binh-luan"
                        className={(nav) => clsx({ [styles.active]: nav.isActive })}
                    >
                        <i className="fa fa-newspaper-o"></i>
                        Quản lý bình luận
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/bang-dieu-khien/quan-ly-danh-gia"
                        className={(nav) => clsx({ [styles.active]: nav.isActive })}
                    >
                        <i className="fa fa-pencil-square-o"></i>
                        Quản lý đánh giá
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dang-xuat"
                        className={(nav) => clsx({ [styles.active]: nav.isActive })}
                    >
                        <i className="fa fa-sign-out"></i>
                        Đăng xuất
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Main;
