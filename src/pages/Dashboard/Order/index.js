import clsx from 'clsx';
import orderApi from '../../../api/ordersApi';
import HeaderRight from '../components/HeaderRight';
import ContentRight from '../components/ContentRight';
import bg from '../../../assets/img/background/icon-account-order.png';
import styles from './Order.module.css';
import { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import Loading from './OrderItem/Loading';
import Pagination from '../../../components/Pagination';
import NoData from '../../../components/NoData';
function Order() {
    const [listOrders, setListOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        fetchOrder();
    }, []);
    const fetchOrder = async (page = 1, limit = 5) => {
        const params = {
            page: page,
            limit: limit,
        };
        setLoading(true);
        const response = await orderApi.showByUser(params);
        setLoading(false);
        setListOrders(response.orderList);
        setLimit(response.limit);
        setPage(response.page);
        setTotalPage(response.totalPage);
    };
    const handleChangePage = (valuePage) => {
        if (valuePage > 0 && valuePage <= totalPage && valuePage !== page) {
            fetchOrder(valuePage, 5);
        }
    };
    return (
        <>
            <HeaderRight
                title="Đơn hàng của bạn"
                text="Kiểm tra thông tin đơn hàng của bạn tại đây"
                background={bg}
            />
            <ContentRight title="Đơn hàng đã đặt">
                <div className={clsx(styles.wrapper, 'custom-scroll-bars')}>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Mã đơn hàng</th>
                                <th>Tổng tiền thanh toán</th>
                                <th>Trạng thái</th>
                                <th>Ngày đặt</th>
                                <th>Thao tác</th>
                            </tr>
                            {isLoading ? (
                                <Loading count={limit} />
                            ) : (
                                listOrders.map((item, index) => (
                                    <OrderItem key={item.order_id} item={item} stt={index + 1} />
                                ))
                            )}
                        </tbody>
                    </table>
                    {!listOrders.length && !isLoading && (
                        <NoData text="Bạn chưa có đơn hàng nào ..." />
                    )}
                </div>
                <Pagination page={page} totalPage={totalPage} handleChangePage={handleChangePage} />
            </ContentRight>
        </>
    );
}

export default Order;
