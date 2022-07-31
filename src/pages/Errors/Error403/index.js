import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Error403.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/actions/auth';
import { resertCart } from '../../../redux/actions/cart';
function Error403() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resertCart());
        dispatch(logOut());
    }, []);
    return (
        <div className={clsx(styles.notfound)}>
            <Link to="/" className={clsx(styles.toHomePage)}>
                <i className="fa fa-home"></i>Trang chủ
            </Link>
            <div className={clsx(styles.error403)}>
                <div className={clsx(styles.text)}>
                    <strong>403</strong>
                    <span>Hết phiên đăng nhập</span>
                </div>
            </div>
            <Link to="/dang-nhap" className={clsx(styles.toLoginPage)}>
                Quay về trang đăng nhập
            </Link>
        </div>
    );
}

export default Error403;
