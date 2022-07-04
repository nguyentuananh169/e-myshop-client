import clsx from 'clsx';
import styles from './ActionBox.module.css';
function ActionLeft({ children }) {
    return <div className={clsx(styles.left)}>{children}</div>;
}

export default ActionLeft;
