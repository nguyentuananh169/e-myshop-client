import clsx from 'clsx';
import styles from './NoCart.module.css';
import bgNoItem from '../../../assets/img/background/no-cart.png';
function NoCart() {
    return (
        <div className={clsx(styles.wrapper)}>
            <img src={bgNoItem} alt="" />
            <div className={clsx(styles.text)}>
                <span>Chưa có sản phẩm nào trong giỏ hàng...</span>
            </div>
        </div>
    );
}

export default NoCart;
