import ActionBox from '../components/ActionBox';
import ActionLeft from '../components/ActionBox/ActionLeft';
import ActionRight from '../components/ActionBox/ActionRight';
function Actions({
    valueInput,
    limit,
    status,
    handleChangeInput,
    handleChangeLimit,
    handleChangeStatus,
}) {
    return (
        <ActionBox>
            <ActionLeft>
                <label htmlFor="entries">Số mục:</label>
                <select
                    id="entries"
                    value={limit}
                    onChange={(e) =>
                        handleChangeLimit(e.target.options[e.target.options.selectedIndex].value)
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
                    placeholder="Nhập từ khóa..."
                    value={valueInput}
                    onChange={(e) => handleChangeInput(e.target.value)}
                />
                <select
                    value={status}
                    onChange={(e) =>
                        handleChangeStatus(e.target.options[e.target.options.selectedIndex].value)
                    }
                >
                    <option value="">Theo trạng thái</option>
                    <option value="0">Hiện thị</option>
                    <option value="1">Đang ẩn</option>
                </select>
            </ActionRight>
        </ActionBox>
    );
}

export default Actions;
