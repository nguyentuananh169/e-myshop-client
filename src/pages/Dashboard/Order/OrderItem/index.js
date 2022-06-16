import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import Button from '../../../../components/Button';
import styles from './OrderItem.module.css';
function OrderItem({ item, stt }) {
    let statusElement;
    switch (item.order_status_id) {
        case '1':
            statusElement = (
                <Button warning outline notBtn>
                    <i className="fa fa-send-o"></i>
                    {item.order_status_name}
                </Button>
            );
            break;
        case '2':
            statusElement = (
                <Button dark outline notBtn>
                    <i className="fa fa-handshake-o"></i>
                    {item.order_status_name}
                </Button>
            );
            break;
        case '3':
            statusElement = (
                <Button primary outline notBtn>
                    <i className="fa fa-truck"></i>
                    {item.order_status_name}
                </Button>
            );
            break;
        case '4':
            statusElement = (
                <Button success outline notBtn>
                    <i className="fa fa-check"></i>
                    {item.order_status_name}
                </Button>
            );
            break;
        case '5':
            statusElement = (
                <Button danger outline notBtn>
                    <i className="fa fa-times"></i>
                    {item.order_status_name}
                </Button>
            );
            break;
        default:
            break;
    }
    return (
        <tr className={clsx(styles.wrapper)}>
            <td>{stt}</td>
            <td>{item.order_id}</td>
            <td>
                <NumberFormat
                    value={item.order_total_price}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix="&#8363;"
                />
            </td>
            <td>{statusElement}</td>
            <td>{item.order_created_at}</td>
            <td>
                <Button to={`/bang-dieu-khien/don-hang/${item.order_id}`} primary outline>
                    <i className="fa fa-eye"></i>Xem
                </Button>
            </td>
        </tr>
    );
}
export default OrderItem;
