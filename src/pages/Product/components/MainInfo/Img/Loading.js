import clsx from 'clsx';
import SkeletonLoading from '../../../../../components/SkeletonLoading';
import styles from './Img.module.css';
function Loading() {
    return (
        <div className={clsx(styles.productDetailImg)}>
            <div className={clsx(styles.imgPreviewContainer, 'widthImgPreview')}>
                <SkeletonLoading />
            </div>
            <div className={clsx(styles.listImg)}>
                <SkeletonLoading />
            </div>
        </div>
    );
}

export default Loading;
