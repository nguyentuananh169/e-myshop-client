import clsx from 'clsx';
import SkeletonLoading from '../../../../components/SkeletonLoading';
import styles from './ProductItem.module.css';
function Loading({ count }) {
    return Array(count)
        .fill(0)
        .map((item, index) => (
            <div key={index} className={clsx(styles.wrapper)}>
                <div className={clsx(styles.img)}>
                    <SkeletonLoading />
                </div>
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.name)}>
                        <SkeletonLoading height="40px" />
                    </div>
                    <div className={clsx(styles.price)}>
                        <SkeletonLoading height="20px" />
                    </div>
                </div>
            </div>
        ));
}

export default Loading;
