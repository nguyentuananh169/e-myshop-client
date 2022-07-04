import clsx from 'clsx';
import styles from './ActionBox.module.css';
function ActionBox({ children }) {
    return <div className={clsx(styles.wrapper)}>{children}</div>;
}

export default ActionBox;
