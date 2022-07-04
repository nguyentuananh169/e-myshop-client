import clsx from 'clsx';
import styles from './TableContainer.module.css';
function TableContainer({ children }) {
    return <div className={clsx(styles.wrapper, 'custom-scrollbars')}>{children}</div>;
}

export default TableContainer;
