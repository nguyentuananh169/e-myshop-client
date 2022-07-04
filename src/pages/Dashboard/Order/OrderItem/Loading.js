import clsx from 'clsx';
import SkeletonLoading from '../../../../components/SkeletonLoading';
import styles from './OrderItem.module.css';
function Loading({ count }) {
    return Array(Number(count))
        .fill(0)
        .map((item, index) => (
            <tr key={index} className={clsx(styles.wrapper)}>
                <td>
                    <SkeletonLoading height="35px" />
                </td>
                <td>
                    <SkeletonLoading height="35px" />
                </td>
                <td>
                    <SkeletonLoading height="35px" />
                </td>
                <td>
                    <SkeletonLoading height="35px" />
                </td>
                <td>
                    <SkeletonLoading height="35px" />
                </td>
                <td>
                    <SkeletonLoading height="35px" />
                </td>
            </tr>
        ));
}
export default Loading;
