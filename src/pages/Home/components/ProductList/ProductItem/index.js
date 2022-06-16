import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import Button from '../../../../../components/Button';
import styles from './ProductItem.module.css';
const ProductItem = (props) => {
    let elementStatus;
    if (props.item.pro_status === '1') {
        elementStatus = (
            <div className={clsx(styles.new)}>
                <span>Mới</span>
            </div>
        );
    } else if (props.item.pro_status === '2') {
        elementStatus = (
            <div className={clsx(styles.new)}>
                <span>Nổi bật</span>
            </div>
        );
    }
    return (
        <div
            className={clsx(styles.productItem)}
            style={{ width: props.width ? props.width : null }}
        >
            {elementStatus}
            {props.sale > 0 ? (
                <div className={clsx(styles.sale)}>
                    <span>-{props.item.pro_sale}%</span>
                </div>
            ) : null}
            <div className={clsx(styles.productItemImg)}>
                <Link to={`/product/${props.item.pro_id}`}>
                    <img
                        src={
                            props.item.pro_img
                                ? `${props.item.baseURLImg}${props.item.pro_img}`
                                : null
                        }
                        alt=""
                        width="100%"
                        height="100%"
                    />
                </Link>
                {JSON.parse(props.item.pro_promotion).length > 0 ? (
                    <Link
                        to={`/product/${props.item.pro_id}`}
                        className={clsx(styles.productItemPromotion, 'custom-scrollbars')}
                    >
                        <ul>
                            {JSON.parse(props.item.pro_promotion).map((item, index) => (
                                <li key={index}>
                                    <span>KM</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Link>
                ) : null}
            </div>
            <div className={clsx(styles.productItemName)}>
                <Link to={`/product/${props.item.pro_id}`}>{props.item.pro_name}</Link>
            </div>
            {props.item.total_rating > 0 ? (
                <div className={clsx(styles.productItemReviewStar)}>
                    <span className={clsx(styles.stars)}>
                        <i
                            className={clsx('fa fa-star', {
                                [styles.color]: props.item.star >= 1,
                            })}
                        ></i>
                        <i
                            className={clsx('fa fa-star', {
                                [styles.color]: props.item.star >= 2,
                            })}
                        ></i>
                        <i
                            className={clsx('fa fa-star', {
                                [styles.color]: props.item.star >= 3,
                            })}
                        ></i>
                        <i
                            className={clsx('fa fa-star', {
                                [styles.color]: props.item.star >= 4,
                            })}
                        ></i>
                        <i
                            className={clsx('fa fa-star', {
                                [styles.color]: props.item.star >= 5,
                            })}
                        ></i>
                    </span>
                    <span>{props.item.total_rating} đánh giá</span>
                </div>
            ) : null}
            <div className={clsx(styles.productItemPrice)}>
                {props.item.pro_sale > 0 ? (
                    <>
                        <span>
                            <NumberFormat
                                value={props.item.pro_price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix="&#8363;"
                            />
                        </span>
                        <strike>
                            <NumberFormat
                                value={props.item.pro_cost}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix="&#8363;"
                            />
                        </strike>
                    </>
                ) : (
                    <span>
                        <NumberFormat
                            value={props.item.pro_price}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix="&#8363;"
                        />
                    </span>
                )}
            </div>
            {props.wishList && (
                <div className={clsx(styles.wishList)}>
                    <Button
                        danger
                        outline
                        fullWidth
                        loading={props.isLoading}
                        onClick={() => props.handleRemove(props.item.pro_id)}
                    >
                        <i className="fa fa-times"></i>
                        Xóa khỏi danh sách
                    </Button>
                </div>
            )}
        </div>
    );
};
export default ProductItem;
