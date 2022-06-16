import clsx from 'clsx';
import SkeletonLoading from '../../../../components/SkeletonLoading';
import styles from './CommentItem.module.css';
function Loading({ count }) {
    return Array(count)
        .fill(0)
        .map((item, index) => (
            <div key={index} className={clsx(styles.wrapper)}>
                <div className={clsx(styles.avatar)}>
                    <SkeletonLoading circle width="70px" height="70px" />
                </div>
                <div className={clsx(styles.main)}>
                    <div className={clsx(styles.name)}>
                        <SkeletonLoading height="20px" />
                    </div>
                    <div className={clsx(styles.time)}>
                        <SkeletonLoading height="10px" />
                    </div>
                    <div className={clsx(styles.content)}>
                        <SkeletonLoading height="50px" />
                    </div>
                    <div className={clsx(styles.reply)}>
                        <SkeletonLoading height="20px" />
                    </div>
                    <div className={clsx(styles.link)}>
                        <SkeletonLoading height="20px" />
                    </div>
                </div>
            </div>
        ));
}

export default Loading;
