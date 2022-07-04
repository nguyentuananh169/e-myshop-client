import ActionBox from '../components/ActionBox';
import ActionLeft from '../components/ActionBox/ActionLeft';
import ActionRight from '../components/ActionBox/ActionRight';
function Actions({ params, handleChangeParams, handleChangeInput }) {
    return (
        <ActionBox>
            <ActionLeft>
                <label htmlFor="entries">Số mục:</label>
                <select
                    id="entries"
                    value={params.limit}
                    onChange={(e) =>
                        handleChangeParams({
                            ...params,
                            page: 1,
                            limit: e.target.options[e.target.options.selectedIndex].value,
                        })
                    }
                >
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </ActionLeft>
            <ActionRight>
                <input
                    type="text"
                    placeholder="Nhập email thành viên..."
                    value={params.email}
                    onChange={(e) =>
                        handleChangeInput({ ...params, page: 1, email: e.target.value })
                    }
                />
                <select
                    value={params.level}
                    onChange={(e) =>
                        handleChangeParams({
                            ...params,
                            page: 1,
                            level: e.target.options[e.target.options.selectedIndex].value,
                        })
                    }
                >
                    <option value="">--- Chọn theo chức vụ ---</option>
                    <option value="1">Thành viên</option>
                    <option value="2">kiểm duyệt viên</option>
                    <option value="3">Quản trị viên</option>
                </select>
            </ActionRight>
        </ActionBox>
    );
}

export default Actions;
