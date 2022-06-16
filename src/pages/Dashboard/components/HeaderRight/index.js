import { useSelector } from 'react-redux';
import clsx from 'clsx';
import styles from './HeaderRight.module.css';
function HeaderRight({ title, text, background }) {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className={clsx(styles.wrapper)}>
            <h4>{title}</h4>
            <div className={clsx(styles.heading)}>
                <div className={clsx(styles.text)}>
                    <strong>CHÀO MỪNG QUAY TRỞ LẠI, {user?.user_name}</strong>
                    <i>{text}</i>
                </div>
                <img src={background} alt="" />
            </div>
        </div>
    );
}

export default HeaderRight;
