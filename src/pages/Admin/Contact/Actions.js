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
                    placeholder="Nhập email..."
                    value={params.email}
                    onChange={(e) =>
                        handleChangeInput({ ...params, page: 1, email: e.target.value })
                    }
                />
                <select
                    id="entries"
                    value={params.status}
                    onChange={(e) =>
                        handleChangeParams({
                            ...params,
                            page: 1,
                            status: e.target.options[e.target.options.selectedIndex].value,
                        })
                    }
                >
                    <option value="">---Chọn trạng thái---</option>
                    <option value="0">Chưa trả lời</option>
                    <option value="1">Đã trả lời</option>
                </select>
            </ActionRight>
        </ActionBox>
    );
}

export default Actions;
