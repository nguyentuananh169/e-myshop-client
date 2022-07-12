import Button from '../../../components/Button';
function Item({ stt, item, isLoadingBtn, handleChangeStatus, handleShowFormUpdate, handleDelete }) {
    return (
        <tr>
            <td>{stt}</td>
            <td>{item.name}</td>
            <td>
                {item.status === '0' ? (
                    <Button
                        loading={isLoadingBtn}
                        primary
                        onClick={() => handleChangeStatus(item.id)}
                    >
                        <i className="fa fa-eye"></i>
                        Hiển thị
                    </Button>
                ) : (
                    <Button dark loading={isLoadingBtn} onClick={() => handleChangeStatus(item.id)}>
                        <i className="fa fa-eye-slash"></i>
                        Đã ẩn
                    </Button>
                )}
            </td>
            <td>{item.created}</td>
            <td>{item.updated}</td>
            <td data-type="action">
                <label onClick={() => handleShowFormUpdate(item.id, item.name, item.status)}>
                    <i className="fa fa-pencil-square-o"></i>
                    <span>Xửa danh mục</span>
                </label>
                <label onClick={() => handleDelete(item.id, item.name)}>
                    <i className="fa fa-times"></i>
                    <span>Xóa danh mục</span>
                </label>
            </td>
        </tr>
    );
}

export default Item;
