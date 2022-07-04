import clsx from 'clsx';
import Button from '../../../../components/Button';
import styles from './CardItem.module.css';
function CardItem({ title, count, to }) {
    return (
        <div className={clsx(styles.item)}>
            <div className={clsx(styles.title)}>
                <strong>{title}</strong>
            </div>
            <div className={clsx(styles.count)}>
                <span>{count}</span>
            </div>
            <div className={clsx(styles.btn)}>
                <Button to={to} primary>
                    Xem chi tiết
                </Button>
            </div>
        </div>
    );
}

export default CardItem;
