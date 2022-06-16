import clsx from 'clsx';
import SkeletonLoading from '../../../../../components/SkeletonLoading';
import styles from './BlogItem.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => (
            <div key={index} className={clsx(styles.blogItem)}>
                <div className={clsx(styles.blogItemImg)}>
                    <SkeletonLoading />
                </div>
                <div className={clsx(styles.blogItemTitle)}>
                    <SkeletonLoading height="30px" />
                </div>
                <div className={clsx(styles.blogItemLine)}></div>
                <div className={clsx(styles.blogItemSummary)}>
                    <SkeletonLoading height="50px" />
                </div>
            </div>
        ));
}

export default Loading;
