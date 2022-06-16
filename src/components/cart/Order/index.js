import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import OrderItem from './OrderItem';
import styles from './Order.module.css';
function Order({ cartItems, totalPrice }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <h3>2. Danh sách sản phẩm đặt hàng</h3>
            <div className={clsx(styles.table, 'custom-scrollbars')}>
                <table cellSpacing="0" cellPadding="0" className={clsx(styles.tableBorder)}>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá tiền</th>
                            <th>Tổng (SLxG)</th>
                        </tr>
                        {cartItems.map((item, index) => (
                            <OrderItem
                                key={item.id || item.order_pro_id}
                                stt={index + 1}
                                img={item.pro_img}
                                name={item.pro_name}
                                qty={item.pro_qty}
                                price={item.pro_price}
                                attr={item.pro_attr}
                                promotion={item.pro_promotion}
                            />
                        ))}
                        <tr className={clsx(styles.noBorder)}>
                            <td colSpan="5" className={clsx(styles.right)}>
                                Tổng tiền
                            </td>
                            <td>
                                <NumberFormat
                                    value={totalPrice}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix="&#8363;"
                                />
                            </td>
                        </tr>
                        <tr className={clsx(styles.noBorder)}>
                            <td colSpan="5" className={clsx(styles.right)}>
                                Giảm giá
                            </td>
                            <td>- 0 &#8363;</td>
                        </tr>
                        <tr className={clsx(styles.noBorder)}>
                            <td colSpan="5" className={clsx(styles.right)}>
                                Tổng tiền thanh toán
                            </td>
                            <td className={clsx(styles.totalPrice)}>
                                <NumberFormat
                                    value={totalPrice}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix="&#8363;"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Order;
