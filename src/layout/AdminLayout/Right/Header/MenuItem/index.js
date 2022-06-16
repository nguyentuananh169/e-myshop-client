import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './MenuItem.module.css';
function MenuItem() {
    return (
        <li>
            <Link to="/">Trang chủ</Link>
        </li>
    );
}

export default MenuItem;
