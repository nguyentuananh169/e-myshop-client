import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Logo.module.css';
import logo from '../../../../../assets/img/icon/logo-web.png';

function Logo() {
    return (
        <div className={clsx(styles.logo)}>
            <Link to="/">
                <img src={logo} alt="" />
            </Link>
        </div>
    );
}

export default Logo;
