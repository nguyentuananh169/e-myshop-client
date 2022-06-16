import clsx from 'clsx';
import styles from './Header.module.css';
import logo from '../../../../assets/img/icon/logo-web.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header({ handleSetShowMenu }) {
    const countCart = useSelector((state) => state.cart.cartItems.length);
    return (
        <div className={clsx(styles.header)}>
            <div className={clsx(styles.iconBars)} onClick={handleSetShowMenu}>
                <i className="fa fa-bars"></i>
            </div>
            <div className={clsx(styles.logo)}>
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
            </div>

            <Link to="/gio-hang" className={clsx(styles.cart)}>
                <i className="fa fa-shopping-bag"></i>
                <span className={clsx(styles.countCart)}>
                    {countCart <= 99 ? countCart : '99+'}
                </span>
                {countCart ? <span className={clsx(styles.bubble, 'aniBubble')}></span> : null}
            </Link>
        </div>
    );
}

export default Header;
