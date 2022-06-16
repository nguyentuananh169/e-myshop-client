import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import DropdownMenuBlog from '../DropdownMenuBlog';
import DropdownMenuProduct from '../DropdownMenuProduct';
import styles from './Menu.module.css';
import noAvt from '../../../../../assets/img/icon/no-avatar.jpg';

function Menu({ mobile, handleShowMenuMoible }) {
    const auth = useSelector((state) => state.auth);
    const [isActiveMenuProduct, setActiveMenuProduct] = useState(false);
    const [isActiveMenuBlog, setActiveMenuBlog] = useState(false);
    return (
        <>
            <div
                className={clsx('overlay c-pointer ', {
                    active: mobile,
                })}
                onClick={handleShowMenuMoible}
            ></div>
            <div
                className={clsx(styles.menu, {
                    [styles.active]: mobile,
                })}
            >
                <div className={clsx(styles.navUser)}>
                    <div className={clsx(styles.avatar)}>
                        <img
                            src={
                                auth.user?.user_avatar
                                    ? `${auth.user.baseURLImg}${auth.user.user_avatar}`
                                    : noAvt
                            }
                            alt=""
                        />
                    </div>
                    <ul>
                        {auth.isAuthentication ? (
                            <>
                                <li>
                                    <Link to="/bang-dieu-khien">Tài khoản</Link>
                                </li>
                                <li>
                                    <span>
                                        Xin chào:
                                        <strong>{auth.user.user_name}</strong>
                                    </span>
                                </li>
                                <li>
                                    <Link to="/dang-xuat">Đăng xuất</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/dang-nhap">Đăng nhập</Link>
                                </li>
                                <li>
                                    <Link to="/dang-ky">Đăng ký</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className={clsx(styles.closeMenuMobile)} onClick={handleShowMenuMoible}>
                        <i className="fa fa-times"></i>
                    </div>
                </div>
                <ul className="custom-scrollbars">
                    <li>
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li onClick={() => setActiveMenuProduct(!isActiveMenuProduct)}>
                        <span>
                            Sản phẩm<i className="fa fa-sort-desc"></i>
                        </span>
                        <div
                            className={clsx(styles.dropdownMenu, {
                                [styles.menuMobile]: mobile,
                                [styles.active]: isActiveMenuProduct,
                            })}
                        >
                            <DropdownMenuProduct mobile={mobile} active={isActiveMenuProduct} />
                        </div>
                    </li>
                    <li
                        className={clsx(styles.dropdown, styles.posRelative)}
                        onClick={() => setActiveMenuBlog(!isActiveMenuBlog)}
                    >
                        <Link to="/tin-tuc">
                            <i className="fa fa-sort-desc"></i>
                            Tin tức
                        </Link>
                        <div className={clsx(styles.dropdownMenu)}>
                            <DropdownMenuBlog mobile={mobile} active={isActiveMenuBlog} />
                        </div>
                    </li>
                    <li>
                        <Link to="/lien-he">Liên hệ</Link>
                    </li>
                    {auth.isAdmin && (
                        <li>
                            <Link to="/admin">Admin</Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}

export default Menu;
