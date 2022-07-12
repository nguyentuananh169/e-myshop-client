import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import Button from '../../../components/Button';
import styles from './LayoutRight.module.css';
function LayoutRight() {
    const cart = useSelector((state) => state.cart);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.bodyTable)}>
                <table>
                    <tbody>
                        {cart.cartItems.map((item) => (
                            <tr key={item.id}>
                                <td className={clsx(styles.img)}>
                                    <img src={item.pro_img} alt="" />
                                </td>
                                <td className={clsx(styles.info)}>
                                    <p className={clsx(styles.name)}>{item.pro_name}</p>
                                    <p className={clsx(styles.attr)}>
                                        {JSON.parse(item.pro_attr).map((item, index) => (
                                            <span key={index}>
                                                {index > 0 ? ' / ' : null}
                                                {item.value}
                                            </span>
                                        ))}
                                    </p>
                                    <p className={clsx(styles.qty)}>
                                        <NumberFormat
                                            value={item.pro_price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix="&#8363;"
                                        />{' '}
                                        x {item.pro_qty}
                                    </p>
                                </td>
                                <td className={clsx(styles.price)}>
                                    <span>
                                        <NumberFormat
                                            value={item.pro_price * item.pro_qty}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix="&#8363;"
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={clsx(styles.module)}>
                <div className={clsx(styles.totalPrice)}>
                    <span>Tổng tiền thanh toán</span>
                    <NumberFormat
                        value={cart.totalPrice}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix="&#8363;"
                    />
                </div>
                <div className={clsx(styles.payments)}>
                    <div className={clsx(styles.group)}>
                        <input type="radio" id="payment-1" checked readOnly />
                        <label htmlFor="payment-1">Thanh toán khi nhận hàng</label>
                    </div>
                </div>
                <div className={clsx(styles.actions)}>
                    <Button to="/gio-hang" primary outline>
                        <i className="fa fa-chevron-left"></i> Quay lại giỏ hàng
                    </Button>
                    <Button primary>
                        <i className="fa fa-chevron-right"></i>
                        Tiếp tục thanh toán
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LayoutRight;
