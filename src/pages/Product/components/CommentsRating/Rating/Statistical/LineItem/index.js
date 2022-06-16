import clsx from 'clsx';
import styles from './LineItem.module.css';
function LineItem({ ptStar, number }) {
    return (
        <div className={clsx(styles.item)}>
            <div className={clsx(styles.number)}>
                {number}
                <i className="fa fa-star"></i>
            </div>
            <div className={clsx(styles.line)}>
                <div className={clsx(styles.bg)} style={{ width: `${ptStar}%` }}></div>
            </div>
            <div className={clsx(styles.percent)}>{ptStar > 0 ? ptStar : 0}%</div>
        </div>
    );
}

export default LineItem;
