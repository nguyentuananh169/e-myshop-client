import clsx from 'clsx';
import styles from './ContentContainer.module.css';
function ContentContainer({ children }) {
    return <div className={clsx(styles.wrapper)}>{children}</div>;
}

export default ContentContainer;
