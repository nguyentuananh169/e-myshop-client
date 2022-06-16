import styles from './LayoutLeft.module.css';
function LayoutLeft({ children }) {
    return <div className={styles.wrapper}>{children}</div>;
}

export default LayoutLeft;
