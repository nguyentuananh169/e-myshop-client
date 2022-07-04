import NumberFormat from 'react-number-format';
import Button from '../../../components/Button';
function Item({ stt, item, statusList, handleChangeStatus, handleAddNote, handleViewOrders }) {
    let elementStatus;
    switch (item.order_status_id) {
        case '4':
            elementStatus = (
                <Button success notBtn>
                    <i className="fa fa-check"></i>Đơn hàng thành công
                </Button>
            );

            break;
        case '5':
            elementStatus = (
                <Button danger notBtn>
                    <i className="fa fa-times"></i>Đơn hàng thất bại
                </Button>
            );
            break;

        default:
            elementStatus = (
                <select
                    value={item.order_status_id}
                    onChange={(e) =>
                        handleChangeStatus(
                            item.order_id,
                            e.target.options[e.target.options.selectedIndex].value,
                        )
                    }
                >
                    {statusList.map((status) => (
                        <option key={status.status_id} value={status.status_id}>
                            {status.status_name}
                        </option>
                    ))}
                </select>
            );
            break;
    }
    return (
        <tr>
            <td>{stt}</td>
            <td>{item.user_name}</td>
            <td>{item.order_id}</td>
            <td>
                <NumberFormat
                    value={item.order_total_price}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix="&#8363;"
                />
            </td>
            <td>{elementStatus}</td>
            <td>{item.order_updated_at}</td>
            <td data-type="action">
                <label onClick={() => handleViewOrders(item.order_id)}>
                    <i className="fa fa-eye"></i>
                    <span>Xem đơn hàng</span>
                </label>
                <label onClick={() => handleAddNote(item.order_id)}>
                    <i className="fa fa-pencil-square-o"></i>
                    <span>Ghi chú đơn hàng</span>
                </label>
            </td>
        </tr>
    );
}

export default Item;
