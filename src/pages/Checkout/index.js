import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import orderApi from '../../api/ordersApi';
import { addNewToastMessage } from '../../redux/actions/toastMessage';
import { resertCart } from '../../redux/actions/cart';
import Path from '../../components/Path';
import User from '../../components/cart/User';
import Order from '../../components/cart/Order';
import Button from '../../components/Button';
import styles from './Checkout.module.css';
import iconCheck from '../../assets/img/icon/check.png';

function Checkout() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        const params = new FormData();
        params.append('_user', JSON.stringify(cart.user));
        params.append('_product', JSON.stringify(cart.cartItems));
        params.append('_total_price', cart.totalPrice);
        const response = await orderApi.add(params);
        if (response[0].error === 1) {
            setLoading(false);
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(resertCart());
        dispatch(addNewToastMessage('success', 'Thành công', 'Đặt hàng thành công'));
        navigate(`/gio-hang/gui-di/${response[0].order_id}/${cart.totalPrice}`);
    };
    if (cart.cartItems.length === 0) {
        return <Navigate to="/" />;
    }
    const path = [
        {
            name: 'Giỏ hàng',
            url: '/gio-hang',
        },
        {
            name: 'Thanh toán',
            url: '/thanh-toan',
        },
        {
            name: 'Thủ tục thanh toán',
            url: '/thu-tuc-thanh-toan',
        },
    ];
    return (
        <>
            <Path path={path} />
            <div className="container">
                <div className={clsx(styles.wrapper)}>
                    <div className={clsx(styles.heading)}>
                        <img src={iconCheck} alt="" />
                        <h4>Vui lòng kiểm tra lại thông tin đặt hàng dưới đây</h4>
                    </div>
                </div>
                <User user={cart.user} />
                <Order cartItems={cart.cartItems} totalPrice={cart.totalPrice} />
                <div className={clsx(styles.btnSubmit)}>
                    <Button large primary loading={isLoading} onClick={handleSubmit}>
                        <i className="fa fa-check"></i>XÁC NHẬN VÀ ĐẶT HÀNG
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Checkout;
