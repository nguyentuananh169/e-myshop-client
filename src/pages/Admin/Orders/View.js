import { useEffect, useState } from 'react';
import ordersApi from '../../../api/ordersApi';
import Modal from '../components/Modal';
import Order from '../../../components/cart/Order';
import Status from '../../../components/cart/Status';
import User from '../../../components/cart/User';
import Nodata from '../../../components/NoData';
import LoadingBox from '../../../components/LoadingBox';
function View({ isShowView, orderView, handleShowView }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});
    useEffect(() => {
        if (orderView) {
            const fetchOrderView = async () => {
                setLoading(true);
                const response = await ordersApi.showById(orderView);
                setLoading(false);
                setData(response[0]);
            };
            fetchOrderView();
        }
    }, [orderView]);
    return (
        <Modal
            isOpen={isShowView}
            outerClose
            overlay
            title={`Xem đơn hàng`}
            style={{ maxWidth: '900px' }}
            onClose={handleShowView}
        >
            {!isLoading && data.error === 0 && (
                <>
                    <User adminPage user={data.orders_info} />
                    <Order
                        adminPage
                        cartItems={data.orders_product}
                        totalPrice={data.orders_info.total_price}
                    />
                    <Status adminPage user={data.orders_info} />
                </>
            )}
            {!isLoading && data.error === 1 && (
                <Nodata textColor="red" text="Đơn hàng không tồn tại" />
            )}
            {isLoading && <LoadingBox color="#dba901" />}
        </Modal>
    );
}

export default View;
