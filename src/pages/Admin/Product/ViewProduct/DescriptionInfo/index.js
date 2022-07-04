import clsx from 'clsx';
import styles from './DescriptionInfo.module.css';
function DescriptionInfo({ proDes }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <h4 className={clsx(styles.title)}>Mô tả sản phẩm</h4>
            <div className={clsx(styles.body)}>
                <div dangerouslySetInnerHTML={{ __html: proDes }}></div>
            </div>
        </div>
    );
}

export default DescriptionInfo;
