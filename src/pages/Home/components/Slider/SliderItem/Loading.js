import clsx from 'clsx';
import SkeletonLoading from '../../../../../components/SkeletonLoading';
import styles from './SliderItem.module.css';
function Loading({ widthSlider }) {
    return (
        <div className={clsx(styles.slider, 'width')}>
            <SkeletonLoading height={`${widthSlider / 2.7}px`} />
        </div>
    );
}
export default Loading;
