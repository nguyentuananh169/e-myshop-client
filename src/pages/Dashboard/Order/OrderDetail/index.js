import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import ordersApi from '../../../../api/ordersApi';
import LoadingBox from '../../../../components/LoadingBox';
import User from '../../../../components/cart/User';
import Order from '../../../../components/cart/Order';
import styles from './OrderDetail.module.css';
import check from '../../../../assets/img/icon/check.png';
import Status from '../../../../components/cart/Status';
import NoData from '../../../../components/NoData';
function OrderDetail() {
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const params = useParams();
    useEffect(() => {
        if (params.id) {
            const fetchOrder = async () => {
                setLoading(true);
                const response = await ordersApi.showById(params.id);
                if (response[0].error === 0) {
                    setUser(response[0].orders_info);
                    setOrders(response[0].orders_product);
                    setTotalPrice(response[0].orders_info.total_price);
                    setErrorMessage('');
                } else {
                    setErrorMessage(response[0].message);
                }
                setLoading(false);
            };
            fetchOrder();
        }
    }, [params.id]);
    return (
        <div className="container">
            <div className={clsx(styles.back)}>
                <Link to="/bang-dieu-khien/don-hang">
                    <i className="fa fa-chevron-left"></i>
                    Quay lại
                </Link>
            </div>
            <div className={clsx(styles.heading)}>
                <img src={check} alt="" />
                <strong>
                    Thông tin đơn hàng số <span>{params.id}</span>
                </strong>
            </div>
            {isLoading ? (
                <LoadingBox />
            ) : (
                <>
                    {errorMessage ? (
                        <NoData text={errorMessage} />
                    ) : (
                        <>
                            <User user={user} />
                            <Order cartItems={orders} totalPrice={totalPrice} />
                            <Status user={user} />
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default OrderDetail;
