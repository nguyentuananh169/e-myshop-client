import Button from '../../../components/Button';
function Item({ stt, item, handleShowFormReply }) {
    return (
        <tr>
            <td>{stt}</td>
            <td>{item.c_name}</td>
            <td>{item.c_email}</td>
            <td>
                {item.c_status === '0' ? (
                    <Button notBtn dark>
                        <i className="fa fa-info-circle"></i>
                        Chưa trả lời
                    </Button>
                ) : (
                    <Button notBtn success>
                        <i className="fa fa-check-square-o"></i>
                        Đã trả lời
                    </Button>
                )}
            </td>
            <td>{item.c_created_at}</td>
            <td data-type="action">
                <label onClick={() => handleShowFormReply(item)}>
                    <i className="fa fa-pencil-square-o"></i>
                    <span>Xem và trả lời</span>
                </label>
            </td>
        </tr>
    );
}

export default Item;
