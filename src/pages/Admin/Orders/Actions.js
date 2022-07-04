import ActionBox from '../components/ActionBox';
import ActionLeft from '../components/ActionBox/ActionLeft';
import ActionRight from '../components/ActionBox/ActionRight';
function Actions({ isLoadingStatus, params, statusList, handleChangeParams, handleChangeInput }) {
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
                    placeholder="Nhập mã đơn hàng..."
                    value={params.id}
                    onChange={(e) => handleChangeInput({ ...params, page: 1, id: e.target.value })}
                />
                <select
                    value={params.statusId}
                    onChange={(e) =>
                        handleChangeParams({
                            ...params,
                            page: 1,
                            statusId: e.target.options[e.target.options.selectedIndex].value,
                        })
                    }
                >
                    {isLoadingStatus ? (
                        <option value="">--- Đang tải dữ liệu ---</option>
                    ) : (
                        <option value="">--- Chọn danh mục ---</option>
                    )}
                    {statusList.map((item) => (
                        <option key={item.status_id} value={item.status_id}>
                            {item.status_name}
                        </option>
                    ))}
                </select>
            </ActionRight>
        </ActionBox>
    );
}

export default Actions;
