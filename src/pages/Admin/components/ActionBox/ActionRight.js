import clsx from 'clsx';
import styles from './ActionBox.module.css';
function ActionRight({ children }) {
    return <div className={clsx(styles.right)}>{children}</div>;
}

export default ActionRight;
