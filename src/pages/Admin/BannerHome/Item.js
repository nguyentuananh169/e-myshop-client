import useSliceString from '../../../hook/useSliceString';
import Button from '../../../components/Button';
function Item({ stt, item, handleShowFormUpdate, handleDelete }) {
    return (
        <tr>
            <td>{stt}</td>
            <td>
                <img
                    src={`${item.baseURLImg}${item.bh_img}`}
                    alt=""
                    style={{ width: '180px', height: '100px', objectFit: 'contain' }}
                />
            </td>
            <td>{useSliceString(item.bh_link, 50)}</td>
            <td>{item.bh_created_at}</td>
            <td>{item.bh_updated_at}</td>
            <td data-type="action">
                <label onClick={() => handleShowFormUpdate(item)}>
                    <i className="fa fa-pencil-square-o"></i>
                    <span>Xửa banner</span>
                </label>
                <label onClick={() => handleDelete(item.bh_id)}>
                    <i className="fa fa-times"></i>
                    <span>Xóa banner</span>
                </label>
            </td>
        </tr>
    );
}

export default Item;
