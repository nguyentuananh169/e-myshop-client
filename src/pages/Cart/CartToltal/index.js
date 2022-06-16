import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import Button from '../../../components/Button';
import styles from './CartToltal.module.css';
function CartToltal(props) {
    return (
        <div className={clsx(styles.cartToltal)}>
            <div className={clsx(styles.discountCode)}>
                <input type="text" placeholder="Mã giảm giá" />
                <button>Áp dụng</button>
            </div>
            <p>
                Tổng giá trị:
                <NumberFormat
                    value={props.totalPrice}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix="&#8363;"
                />
            </p>
            <p>Giảm giá: -00 &#8363;</p>
            <p>
                Tổng thanh toán:{' '}
                <strong>
                    <NumberFormat
                        value={props.totalPrice}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix="&#8363;"
                    />
                </strong>
            </p>
            <Button to="/" outline primary>
                <i className="fa fa-arrow-left"></i>
                Tiếp tục mua hàng
            </Button>
            <Button to="/thanh-toan" primary>
                <i className="fa fa-arrow-right"></i>
                Tiến hành thanh toán
            </Button>
        </div>
    );
}

export default CartToltal;
