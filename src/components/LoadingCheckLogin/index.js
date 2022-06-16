import clsx from 'clsx';
import styles from './LoadingCheckLogin.module.css';
function LoadingCheckLogin() {
    return (
        <div className={clsx(styles.wrapper)}>
            <span>Đang kiểm tra đăng nhập. Vui lòng chờ ...</span>
        </div>
    );
}

export default LoadingCheckLogin;
