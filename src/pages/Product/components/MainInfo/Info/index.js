import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import { addNewToastMessage } from '../../../../../redux/actions/toastMessage';
import { addNewCart } from '../../../../../redux/actions/cart';
import styles from './Info.module.css';
function Info({ id, name, UrlImg, price, cost, sale, promotion, attr, amount }) {
    let proAttr = attr ? JSON.parse(attr) : [];
    let proPromotion = promotion ? JSON.parse(promotion) : [];
    const checkLogin = useSelector((state) => state.auth.isAuthentication);
    const cartStore = useSelector((state) => state.cart.cartItems);
    const cartByProductId = cartStore.filter((item) => item.pro_id === id);
    const [qty, setQty] = useState(0);
    const [attrCart, setAttrCart] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        let newArray = [];
        proAttr.forEach((item) => {
            newArray.push({
                id: item.id,
                type: item.type,
                value: item.value[0],
            });
        });
        setAttrCart(newArray);
    }, [attr]);
    const handleChangeAttrCart = (index, option) => {
        let newArray = [...attrCart];
        newArray[index].value = option;
        setAttrCart(newArray);
    };
    const handleChangeQty = (value) => {
        let number = Number(value);
        if (!isNaN(number) && number >= 0 && number <= amount) {
            setQty(number);
        }
    };
    const handleClickQty = (type) => {
        let number = qty;
        switch (type) {
            case 'tang':
                number++;
                break;
            case 'giam':
                number--;
                break;
            default:
                break;
        }
        if (number >= 0 && number <= amount) {
            setQty(number);
        }
    };
    const handleAddCart = () => {
        if (amount <= 0) {
            return dispatch(addNewToastMessage('error', 'Thất bại', 'Sản phẩm này đã hết hàng'));
        }
        if (!checkLogin) {
            dispatch(
                addNewToastMessage(
                    'error',
                    'Thất bại',
                    'Bạn phải đăng nhập mới sử dụng được chức năng này',
                ),
            );
            return navigate('/dang-nhap');
        }
        if (qty <= 0) {
            return dispatch(addNewToastMessage('error', 'Thất bại', 'Bạn chưa nhập số lượng mua'));
        }
        const qtyCart = cartByProductId.reduce((pre, current) => pre + current.pro_qty, 0);
        if (qty + qtyCart > amount) {
            return dispatch(
                addNewToastMessage('error', 'Thất bại', 'Số lượng trong kho không đủ', 4000),
            );
        }
        dispatch(
            addNewCart({
                id: Math.floor(Math.random() * 10000),
                pro_id: id,
                pro_name: name,
                pro_price: price,
                pro_sale: sale,
                pro_cost: cost,
                pro_qty: qty,
                pro_attr: JSON.stringify(attrCart),
                pro_promotion: promotion,
                pro_img: UrlImg,
            }),
        );
        setQty(0);
        dispatch(addNewToastMessage('success', 'Thành công', 'Thêm giỏ hàng thành công'));
    };
    return (
        <div className={clsx(styles.productDetailCenter)}>
            <div className={clsx(styles.productPrice)}>
                {sale > 0 ? (
                    <>
                        <strong>
                            <NumberFormat
                                value={price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix="&#8363;"
                            />
                        </strong>
                        <i>
                            Giá niêm yết :{' '}
                            <strike>
                                <NumberFormat
                                    value={cost}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix="&#8363;"
                                />
                            </strike>
                        </i>
                    </>
                ) : (
                    <>
                        <strong>
                            <NumberFormat
                                value={price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix="&#8363;"
                            />
                        </strong>
                    </>
                )}
            </div>
            <div className={clsx(styles.freeShip)}>
                <i className="fa fa-truck"></i>
                <span>Miễn phí vận chuyển toàn quốc</span>
            </div>
            <div className={clsx(styles.productOption)}>
                {proAttr.map((item, index1) => (
                    <div key={item.id}>
                        <strong className={clsx(styles.label)}>Lựa chọn {item.type}</strong>
                        <div className={clsx(styles.options)}>
                            {item.value.map((option, index2) => (
                                <div
                                    key={index2}
                                    className={clsx(styles.option, {
                                        [styles.active]: option === attrCart[index1]?.value,
                                    })}
                                    onClick={() => handleChangeAttrCart(index1, option)}
                                >
                                    <span className={clsx(styles.check)}>
                                        <i className="fa fa-check"></i>
                                    </span>
                                    <span className={clsx(styles.text)}>{option}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {proPromotion.length > 0 && (
                <div className={clsx(styles.productPromotion)}>
                    <strong>KHUYẾN MÃI</strong>
                    <ul>
                        {proPromotion.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className={clsx(styles.productCheckQty)}>
                {amount > 0 ? (
                    <>
                        <span className={clsx(styles.conHang)}>
                            <i className="fa fa-check"></i>
                            Còn hàng
                        </span>
                        <i className={clsx(styles.amount)}>( {amount} số lượng có sẵn )</i>
                    </>
                ) : (
                    <span className={clsx(styles.hetHang)}>
                        <i className="fa fa-times"></i>
                        Hết hàng
                    </span>
                )}
            </div>
            <div className={clsx(styles.productQty)}>
                <strong>Số lượng mua: </strong>
                <div className={clsx(styles.qty)}>
                    <button onClick={() => handleClickQty('giam')}>&#8722;</button>
                    <input
                        type="text"
                        value={qty}
                        onChange={(e) => handleChangeQty(e.target.value)}
                    />
                    <button onClick={() => handleClickQty('tang')}>+</button>
                </div>
            </div>
            <div
                className={clsx(styles.productAction, {
                    disabled: amount <= 0,
                })}
            >
                <button className={clsx(styles.buyNow)}>Mua ngay</button>
                <button className={clsx(styles.addCart)} onClick={handleAddCart}>
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    );
}

export default Info;
