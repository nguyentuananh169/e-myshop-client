import clsx from 'clsx';
import SkeletonLoading from '../../../../components/SkeletonLoading';
import styles from './NewsItem.module.css';
function Loading({ count }) {
    return Array(count)
        .fill(0)
        .map((item, index) => (
            <div key={index} className={clsx(styles.card)}>
                <div className={clsx(styles.body)}>
                    <div className={clsx(styles.img)}>
                        <SkeletonLoading />
                    </div>
                    <div className={clsx(styles.content)}>
                        <div className={clsx(styles.title)}>
                            <SkeletonLoading height="40px" />
                        </div>
                        <div className={clsx(styles.summary)}>
                            <SkeletonLoading height="60px" />
                        </div>
                        <div className={clsx(styles.author)}>
                            <SkeletonLoading circle width="30px" height="30px" />
                            <span className={clsx(styles.name)}>
                                <SkeletonLoading width="100px" height="30px" />
                            </span>
                            <span className={clsx(styles.time)}>
                                <SkeletonLoading width="100px" height="30px" />
                            </span>
                        </div>
                        <div className={clsx(styles.category)}>
                            <SkeletonLoading width="135px" height="30px" />
                        </div>
                    </div>
                </div>
            </div>
        ));
}

export default Loading;
