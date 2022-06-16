import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import styles from './DropdownMenuAccount.module.css';
const AccountMenu = () => {
    const isAuthentication = useSelector((state) => state.auth.isAuthentication);
    return (
        <div className={clsx(styles.wrapper)}>
            <ul>
                {isAuthentication ? (
                    <>
                        <li>
                            <Link to="/bang-dieu-khien">
                                <i className="fa fa-user"></i>Tài khoản
                            </Link>
                        </li>
                        <li>
                            <Link to="/dang-xuat">
                                <i className="fa fa-sign-out"></i>Đăng xuất
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/dang-nhap">
                                <i className="fa fa-sign-in"></i>Đăng nhập
                            </Link>
                        </li>
                        <li>
                            <Link to="/dang-ky">
                                <i className="fa fa-user-plus"></i>Đăng ký
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default AccountMenu;
