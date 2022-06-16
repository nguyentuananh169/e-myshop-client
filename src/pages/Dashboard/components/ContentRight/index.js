import clsx from 'clsx';
import styles from './ContentRight.module.css';
function ContentRight({ title, children }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <h4 className={clsx(styles.title)}>{title}</h4>
            <div className={clsx(styles.main)}>{children}</div>
        </div>
    );
}

export default ContentRight;
