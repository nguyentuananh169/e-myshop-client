import ActionBox from '../components/ActionBox';
import ActionLeft from '../components/ActionBox/ActionLeft';
import ActionRight from '../components/ActionBox/ActionRight';
function Actions({ params, handleChangeInput, handleChangeParams }) {
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
                    placeholder="Nhập tên danh mục..."
                    value={params.name}
                    onChange={(e) =>
                        handleChangeInput({ ...params, page: 1, name: e.target.value })
                    }
                />
                <select
                    value={params.status}
                    onChange={(e) =>
                        handleChangeParams({
                            ...params,
                            page: 1,
                            status: e.target.options[e.target.options.selectedIndex].value,
                        })
                    }
                >
                    <option value="">Theo trạng thái</option>
                    <option value="0">Hiện thị</option>
                    <option value="1">Đã ẩn</option>
                </select>
            </ActionRight>
        </ActionBox>
    );
}

export default Actions;
