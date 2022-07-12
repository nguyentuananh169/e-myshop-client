import useSliceString from '../../../hook/useSliceString';
import Button from '../../../components/Button';
function Item({
    stt,
    isLoadingBtn,
    item,
    handleShowView,
    handleShowFormUpdate,
    handleDelete,
    handleChangeStatus,
}) {
    return (
        <tr>
            <td>{stt}</td>
            <td>{item.cate_name}</td>
            <td>
                <img src={`${item.baseURLImg}${item.news_img}`} alt="" />
            </td>
            <td>{useSliceString(item.news_title, 40)}</td>
            <td>
                {item.news_status === '0' ? (
                    <Button
                        loading={isLoadingBtn}
                        primary
                        onClick={() => handleChangeStatus(item.news_id)}
                    >
                        <i className="fa fa-eye"></i>
                        Hiển thị
                    </Button>
                ) : (
                    <Button
                        dark
                        loading={isLoadingBtn}
                        onClick={() => handleChangeStatus(item.news_id)}
                    >
                        <i className="fa fa-eye-slash"></i>
                        Đã ẩn
                    </Button>
                )}
            </td>
            <td>{item.news_created_at}</td>
            <td data-type="action">
                <label onClick={() => handleShowView(item)}>
                    <i className="fa fa-eye"></i>
                    <span>Xem tin tức</span>
                </label>
                <label onClick={() => handleShowFormUpdate(item)}>
                    <i className="fa fa-pencil-square-o"></i>
                    <span>Xửa tin tức</span>
                </label>
                <label onClick={() => handleDelete(item.news_id)}>
                    <i className="fa fa-times"></i>
                    <span>Xóa tin tức</span>
                </label>
            </td>
        </tr>
    );
}

export default Item;
