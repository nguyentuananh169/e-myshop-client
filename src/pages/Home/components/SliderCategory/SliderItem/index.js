import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './SliderItem.module.css';
function SliderItem(props) {
    return (
        <div
            className={clsx(styles.categoryItem)}
            style={{ width: `${props.width}px` }}
        >
            <Link to={`/danh-muc-san-pham/${props.item.id}`}>
                <span className={clsx(styles.icon)}>
                    <img
                        src={`${props.item.baseURLImg}${props.item.img}`}
                        alt=""
                    />
                </span>
                <span className={clsx(styles.name)}>{props.item.name}</span>
            </Link>
        </div>
    );
}

export default SliderItem;
