import clsx from 'clsx';
import styles from './PromotionInfo.module.css';
function PromotionInfo({ proPromotion }) {
    let promotion = JSON.parse(proPromotion);
    return (
        <div className={clsx(styles.wrapper)}>
            <h4 className={clsx(styles.title)}>Thông tin khuyến mãi</h4>
            <ul>
                {promotion.map((item, index) => (
                    <li key={index}>
                        <strong className={clsx(styles.bag)}>KM {index + 1}</strong>
                        <p>{item}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PromotionInfo;
