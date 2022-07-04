import clsx from 'clsx';
import styles from './Title.module.css';
function Title({ title, children }) {
    return (
        <>
            <h4 className={clsx(styles.title)}>{title}</h4>
            {children && <div className={clsx(styles.btn)}>{children}</div>}
        </>
    );
}

export default Title;
