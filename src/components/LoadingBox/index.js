import clsx from 'clsx';
import styles from './LoadingBox.module.css';
function LoadingBox({ color = '#333', text = 'Loading...' }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <i className="fa fa-spinner" style={{ color }}></i>
            <span style={{ color }}>{text}</span>
        </div>
    );
}

export default LoadingBox;
