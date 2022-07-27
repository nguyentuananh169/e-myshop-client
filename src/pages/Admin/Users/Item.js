function Item({ stt, item, handleChangeLevelUser, handleChangeStatusUser, handleDeleteUser }) {
    return (
        <tr>
            <td>{stt}</td>
            <td>{item.user_name}</td>
            <td>{item.user_email}</td>
            <td>{item.user_phone}</td>
            <td>
                <select
                    value={item.user_level}
                    onChange={(e) =>
                        handleChangeLevelUser(
                            item.user_id,
                            e.target.options[e.target.options.selectedIndex].value,
                            item.user_name,
                        )
                    }
                >
                    <option value="1">Thành viên</option>
                    <option value="2">kiểm duyệt viên</option>
                    <option value="3">Quản trị viên</option>
                </select>
            </td>
            <td>
                <select
                    value={item.user_status}
                    onChange={(e) =>
                        handleChangeStatusUser(
                            item.user_id,
                            item.user_name,
                            e.target.options[e.target.options.selectedIndex].value,
                        )
                    }
                >
                    <option value="0">Bình thường</option>
                    <option value="1">Chặn</option>
                </select>
            </td>
            <td>{item.user_created_at}</td>
            <td data-type="action" onClick={() => handleDeleteUser(item.user_id, item.user_name)}>
                <label>
                    <i className="fa fa-times"></i>
                    <span>Xóa người dùng</span>
                </label>
            </td>
        </tr>
    );
}

export default Item;
