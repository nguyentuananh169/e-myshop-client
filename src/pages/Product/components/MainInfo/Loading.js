import clsx from 'clsx';
import LoadingInfo from './Info/Loading';
import LoadingImg from './Img/Loading';
import SkeletonLoading from '../../../../components/SkeletonLoading';
import styles from './MainInfo.module.css';
function Loading() {
    return (
        <div className="container">
            <div className={clsx(styles.nameProduct)}>
                <SkeletonLoading width="50%" height="30px" />
            </div>
            <div className={clsx(styles.productDetail)}>
                <LoadingImg />
                <LoadingInfo />
            </div>
        </div>
    );
}

export default Loading;
