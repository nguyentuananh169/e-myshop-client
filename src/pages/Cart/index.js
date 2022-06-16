import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import cartApi from '../../api/cartApi';
import Path from '../../components/Path';
import CartItem from './CartItem';
import styles from './Cart.module.css';
import CartToltal from './CartToltal';
import { changeQtyCart, removeCart } from '../../redux/actions/cart';
import { addNewToastMessage } from '../../redux/actions/toastMessage';
import LoadingBox from '../../components/LoadingBox';
import NoCart from './NoCart';
// import LoadingComponent from '../LoadingComponent';
function Cart() {
    const [isLoading, setLoading] = useState(false);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleChangeQty = async (qty, idProduct, idCart) => {
        if (isNaN(Number(qty)) || isLoading) {
            return;
        }
        const cartItems = cart.cartItems.filter(
            (item) => item.pro_id === idProduct && item.id !== idCart,
        );
        let totalQty = Number(qty) + cartItems.reduce((pre, current) => pre + current.pro_qty, 0);
        if (qty > 0) {
            setLoading(true);
            changeQtyApi(totalQty, idProduct, qty, idCart);
        } else {
            if (window.confirm('Bạn có chắc muốn xóa sản phẩm này trong giỏ hàng')) {
                dispatch(removeCart(idCart));
                dispatch(
                    addNewToastMessage(
                        'success',
                        'Xoá thành công',
                        'Giỏ hàng đã được cập nhật lại',
                        4000,
                    ),
                );
            }
        }
    };
    const click1 = (qty, idProduct, idCart) => {
        qty -= 1;
        const cartItems = cart.cartItems.filter(
            (item) => item.pro_id === idProduct && item.id !== idCart,
        );
        let totalQty = qty + cartItems.reduce((pre, current) => pre + current.pro_qty, 0);
        if (qty > 0) {
            setLoading(true);
            changeQtyApi(totalQty, idProduct, qty, idCart);
        } else {
            if (window.confirm('Bạn có chắc muốn xóa sản phẩm này trong giỏ hàng')) {
                dispatch(removeCart(idCart));
                dispatch(
                    addNewToastMessage(
                        'success',
                        'Xoá thành công',
                        'Giỏ hàng đã được cập nhật lại',
                        4000,
                    ),
                );
            }
        }
    };
    const click2 = (qty, idProduct, idCart) => {
        setLoading(true);
        qty += 1;
        const cartItems = cart.cartItems.filter(
            (item) => item.pro_id === idProduct && item.id !== idCart,
        );
        let totalQty = qty + cartItems.reduce((pre, current) => pre + current.pro_qty, 0);
        changeQtyApi(totalQty, idProduct, qty, idCart);
    };
    const changeQtyApi = async (totalQty, idProduct, qty, idCart) => {
        const params = new FormData();
        params.append('_id', idProduct);
        params.append('_qty', totalQty);
        const response = await cartApi.changeQtyCart(params);
        setLoading(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message, 4000));
        }
        dispatch(changeQtyCart(qty, idCart));
        dispatch(
            addNewToastMessage('success', 'Thành công', 'Giỏ hàng đã được cập nhật lại', 4000),
        );
    };
    const handleRemove = (id) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này trong giỏ hàng')) {
            dispatch(removeCart(id));
            dispatch(
                addNewToastMessage(
                    'success',
                    'Xoá thành công',
                    'Giỏ hàng đã được cập nhật lại',
                    4000,
                ),
            );
        }
    };
    const path = [
        {
            name: 'Giỏ hàng',
            url: '/gio-hang',
        },
    ];
    return (
        <>
            <Path path={path} />
            <div className="container">
                <div className={clsx(styles.cartLayout)}>
                    {isLoading ? (
                        <div className={clsx(styles.loadingCart)}>
                            <LoadingBox />
                        </div>
                    ) : null}
                    <div className={clsx(styles.cartContainer)}>
                        {cart.cartItems.length === 0 ? (
                            <NoCart />
                        ) : (
                            <>
                                <div className="heading">
                                    <h4>Giỏ hàng của bạn</h4>
                                </div>
                                <div className={clsx(styles.cartItems, 'custom-scrollbars')}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>#</th>
                                                <th colSpan={2} style={{ textAlign: 'left' }}>
                                                    Sản phẩm
                                                </th>
                                                <th>Giá</th>
                                                <th>Số lượng</th>
                                                <th>Tạm tính</th>
                                                <th></th>
                                            </tr>
                                            {cart.cartItems.map((item, index) => (
                                                <CartItem
                                                    key={item.id}
                                                    stt={index + 1}
                                                    id={item.id}
                                                    idProduct={item.pro_id}
                                                    img={item.pro_img}
                                                    name={item.pro_name}
                                                    attr={item.pro_attr}
                                                    promotion={item.pro_promotion}
                                                    price={item.pro_price}
                                                    qty={item.pro_qty}
                                                    handleChangeQty={handleChangeQty}
                                                    click1={click1}
                                                    click2={click2}
                                                    handleRemove={handleRemove}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <CartToltal totalPrice={cart.totalPrice} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
