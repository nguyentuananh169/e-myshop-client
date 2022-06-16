import clsx from 'clsx';
import styles from './NoData.module.css';
function NoData({ textColor, text = 'Chưa có dữ liệu phù hợp với yêu cầu của bạn' }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <span style={{ color: `${textColor ? textColor : '#FF0000'}` }}>{text}</span>
        </div>
    );
}

export default NoData;
