import clsx from 'clsx';
import styles from './LoadingCheckLogin.module.css';
function LoadingCheckLogin() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.loading)}>
                <div className={clsx(styles.icon)}></div>
            </div>
            <div className={clsx(styles.title)}>
                <h1>MYSHOP</h1>
                <p>Đang kiểm tra đăng nhập...</p>
            </div>
        </div>
    );
}

export default LoadingCheckLogin;
