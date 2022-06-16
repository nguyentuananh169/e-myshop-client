import clsx from 'clsx';
import SkeletonLoading from '../../../../../components/SkeletonLoading';
import styles from './ProductItem.module.css';
function Loading({ count = 1, width }) {
    return Array(count)
        .fill(0)
        .map((item, index) => (
            <div
                key={index}
                className={clsx(styles.productItem)}
                style={{ width: width ? width : null }}
            >
                <div className={clsx(styles.productItemImg)}>
                    <SkeletonLoading />
                </div>
                <div className={clsx(styles.productItemName)} style={{ padding: '10px 0' }}>
                    <SkeletonLoading height="20px" />
                </div>
                <div className={clsx(styles.productItemReviewStar)}>
                    <SkeletonLoading height="20px" />
                </div>
                <div className={clsx(styles.productItemPrice)}>
                    <SkeletonLoading height="20px" />
                </div>
            </div>
        ));
}

export default Loading;
