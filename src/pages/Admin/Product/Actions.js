import ActionBox from '../components/ActionBox';
import ActionLeft from '../components/ActionBox/ActionLeft';
import ActionRight from '../components/ActionBox/ActionRight';
function Actions({ params, handleChangeName, handleChangeLimit, handleChangeStatus }) {
    return (
        <ActionBox>
            <ActionLeft>
                <label htmlFor="entries">Số mục:</label>
                <select
                    id="entries"
                    value={params.limit}
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
                    value={params.name}
                    onChange={(e) => handleChangeName(e.target.value)}
                />
                <select
                    value={params.status}
                    onChange={(e) =>
                        handleChangeStatus(e.target.options[e.target.options.selectedIndex].value)
                    }
                >
                    <option value="0">Theo trạng thái</option>
                    <option value="1">Mới nhất</option>
                    <option value="2">Nổi bật</option>
                </select>
            </ActionRight>
        </ActionBox>
    );
}

export default Actions;
