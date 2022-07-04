import clsx from 'clsx';
import SkeletonLoading from '../../../../../components/SkeletonLoading';
import styles from './TopReviewsItem.module.css';
function Loading({ count = 1, width }) {
    return Array(count)
        .fill(0)
        .map((item, index) => (
            <div
                key={index}
                className={clsx(styles.topReviewsItem)}
                style={{ width: `${width}px` }}
            >
                <div className={clsx(styles.topReviewsItemAvatar)}>
                    <SkeletonLoading circle width="50px" height="50px" />
                </div>
                <div className={clsx(styles.topReviewsItemMain)}>
                    <div className={clsx(styles.name)}>
                        <SkeletonLoading width={`${width - 185}px`} height="20px" />
                    </div>
                    <div className={clsx(styles.reviewsRating)}>
                        <SkeletonLoading height="40px" />
                    </div>
                    <div className={clsx(styles.content)}>
                        <SkeletonLoading height="15px" />
                    </div>
                    <div className={clsx(styles.time)}>
                        <SkeletonLoading height="15px" />
                    </div>
                </div>
            </div>
        ));
}

export default Loading;
