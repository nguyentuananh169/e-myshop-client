import clsx from 'clsx';
import styles from './LayoutRight.module.css';
function LayoutRight({ children }) {
    return (
        <div className={styles.wrapper}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.heading)}>
                    <strong>Sản phẩm nổi bật</strong>
                </div>
                <div className={clsx(styles.body)}>{children}</div>
            </div>
        </div>
    );
}

export default LayoutRight;
