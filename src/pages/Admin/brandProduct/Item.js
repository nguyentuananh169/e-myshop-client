import Button from '../../../components/Button';
function Item({ stt, item, isLoadingBtn, handleShowFormUpdate, handleStatus, handleDelete }) {
    return (
        <tr>
            <td>{stt}</td>
            <td>{item.name}</td>
            <td>
                <Button primary notBtn>
                    {item.cate_name}
                </Button>
            </td>
            <td>
                <img src={`${item.baseURLImg}${item.img}`} alt="" />
            </td>
            <td>{item.created}</td>
            <td>{item.updated}</td>
            <td data-type="action">
                <label onClick={() => handleShowFormUpdate(item.id, item.cate_id, item.name)}>
                    <i className="fa fa-pencil-square-o"></i>
                    <span>Xửa thương hiệu</span>
                </label>
                <label onClick={() => handleDelete(item.id, item.cate_name, item.name)}>
                    <i className="fa fa-times"></i>
                    <span>Xóa thương hiệu</span>
                </label>
            </td>
        </tr>
    );
}

export default Item;
