import Button from '../../../components/Button';
function Item({ stt, item, isLoadingBtn, handleShowFormUpdate, handleStatus, handleDelete }) {
    return (
        <tr>
            <td>{stt}</td>
            <td>{item.name}</td>
            <td>
                <img src={`${item.baseURLImg}${item.img}`} alt="" />
            </td>
            <td>
                <Button
                    primary={item.status === '0'}
                    dark={item.status === '1'}
                    loading={isLoadingBtn}
                    onClick={() => handleStatus(item.id)}
                >
                    {item.status === '0' ? (
                        <>
                            <i className="fa fa-eye"></i>Hiển thị
                        </>
                    ) : (
                        <>
                            <i className="fa fa-eye-slash"></i>Đang ẩn
                        </>
                    )}
                </Button>
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
