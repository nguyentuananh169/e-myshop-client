import clsx from 'clsx';
import styles from './Content.module.css';
function Content({ children }) {
    return <div className={clsx(styles.wrapper)}>{children}</div>;
}

export default Content;
