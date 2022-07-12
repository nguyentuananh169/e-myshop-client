import clsx from 'clsx';
import SkeletonLoading from '../../../components/SkeletonLoading';
import styles from './Comments.module.css';
function Loading({ count }) {
    return Array(Number(count))
        .fill(0)
        .map((item, index) => (
            <tr key={index}>
                <td>
                    <SkeletonLoading height="20px" />
                </td>
                <td>
                    <div className={clsx(styles.infoCmt)}>
                        <div className={clsx(styles.avt)}>
                            <SkeletonLoading circle width="80px" height="80px" />
                        </div>
                        <div className={clsx(styles.info)}>
                            <div>
                                <SkeletonLoading height="20px" />
                            </div>
                            <div className={clsx(styles.mgt)}>
                                <SkeletonLoading height="20px" />
                            </div>
                            <div className={clsx(styles.mgt)}>
                                <SkeletonLoading height="20px" />
                            </div>
                            <div className={clsx(styles.mgt)}>
                                <SkeletonLoading height="20px" />
                            </div>
                            <div className={clsx(styles.link, styles.mgt)}>
                                <SkeletonLoading height="20px" />
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <SkeletonLoading height="25px" />
                </td>
                <td>
                    <SkeletonLoading height="25px" />
                </td>
            </tr>
        ));
}

export default Loading;
