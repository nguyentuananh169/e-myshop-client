import clsx from 'clsx';
import SkeletonLoading from '../../../../../components/SkeletonLoading';
import styles from './Info.module.css';
function Loading() {
    return (
        <div className={clsx(styles.productDetailCenter)}>
            <div className={clsx(styles.productPrice)}>
                <SkeletonLoading width="50%" height="20px" />
            </div>
            <div style={{ marginTop: '20px' }}>
                <SkeletonLoading height="30px" />
            </div>
            <div className={clsx(styles.productOption)}>
                <div>
                    <strong className={clsx(styles.label)}>
                        <SkeletonLoading width="130px" height="20px" />
                    </strong>
                    <div className={clsx(styles.options)}>
                        {Array(3)
                            .fill(0)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className={clsx(styles.option)}
                                    style={{
                                        border: 'none',
                                        overflow: 'hidden',
                                        padding: 0,
                                    }}
                                >
                                    <SkeletonLoading />
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <div className={clsx(styles.productPromotion)}>
                <SkeletonLoading width="130px" height="20px" />
                <ul style={{ border: 'none', overflow: 'hidden', padding: 0 }}>
                    <SkeletonLoading height="100px" />
                </ul>
            </div>
            <div className={clsx(styles.productCheckQty)}>
                <SkeletonLoading width="50%" height="20px" />
            </div>
            <div className={clsx(styles.productQty)}>
                <SkeletonLoading width="80px" height="30px" />
                <div className={clsx(styles.qty)}>
                    <SkeletonLoading width="150px" height="30px" />
                </div>
            </div>
            <div className={clsx(styles.productAction)}>
                <SkeletonLoading width="48%" height="40px" />
                <SkeletonLoading width="48%" height="40px" />
            </div>
        </div>
    );
}

export default Loading;
