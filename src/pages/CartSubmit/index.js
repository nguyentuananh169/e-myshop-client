import { useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import Path from '../../components/Path';
import iconCheck from '../../assets/img/icon/check.png';
import orderOk from '../../assets/img/icon/order-ok.png';
import styles from './CartSubmit.module.css';
import Button from '../../components/Button';
function CartSubmit() {
    const { id, totalPrice } = useParams();
    const path = [
        {
            name: 'Giỏ hàng',
            url: '/gio-hang',
        },
        {
            name: 'Gửi đi',
            url: '/gio-hang/gui-di',
        },
    ];
    return (
        <>
            <Path path={path} />
            <div className="container">
                <div className={clsx(styles.wrapper)}>
                    <img className={clsx(styles.iconCheck)} src={iconCheck} alt="" />
                    <p className={clsx(styles.text1)}>Đặt hàng thành công</p>
                    <p className={clsx(styles.text2)}>
                        Mã đơn hàng: <strong>{id}</strong>
                    </p>
                    <img className={clsx(styles.orderOk)} src={orderOk} alt="" />
                    <p className={clsx(styles.text3)}>
                        Vui lòng kiểm tra thông tin đơn hàng trong tin nhắn, email và trang cá nhân
                        của bạn.
                    </p>
                    <p className={clsx(styles.text4)}>
                        Mã đơn hàng: <strong>{id}</strong>, Tổng tiền thanh toán:{' '}
                        <strong>
                            <NumberFormat
                                value={totalPrice}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix="&#8363;"
                            />
                        </strong>
                    </p>
                </div>

                <div className={clsx(styles.controlButton)}>
                    <Button to="/" primary large>
                        <i className="fa fa-home"></i>QUAY VỀ TRANG CHỦ
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CartSubmit;
