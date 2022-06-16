import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Header.module.css';
function Header({ collapse, handleSetCollapse, handleSetShowMenuMobile }) {
    return (
        <div className={clsx(styles.wrapper, { [styles.collapse]: collapse })}>
            <i className={clsx(styles.logo, 'fa fa-medium')}></i>
            <label>
                <Link to="/admin">MyShop</Link>
            </label>
            <span className={clsx(styles.iconShow)} onClick={handleSetCollapse}>
                <i className={clsx({ [styles.hidden]: collapse })}></i>
            </span>
            <span className={clsx(styles.closeMenuMobile)} onClick={handleSetShowMenuMobile}>
                <i className="fa fa-times"></i>
            </span>
        </div>
    );
}

export default Header;
