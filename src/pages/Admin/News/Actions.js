import ActionBox from '../components/ActionBox';
import ActionLeft from '../components/ActionBox/ActionLeft';
import ActionRight from '../components/ActionBox/ActionRight';
function Actions({ params, isLoadingCate, categoryList, handleChangeParams, handleChangeInput }) {
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
                    placeholder="Nhập từ khóa..."
                    value={params.title}
                    onChange={(e) =>
                        handleChangeInput({ ...params, page: 1, title: e.target.value })
                    }
                />
                <select
                    value={params.category}
                    onChange={(e) =>
                        handleChangeParams({
                            ...params,
                            page: 1,
                            category: e.target.options[e.target.options.selectedIndex].value,
                        })
                    }
                >
                    {isLoadingCate ? (
                        <option value="">--- Đang tải dữ liệu ---</option>
                    ) : (
                        <option value="">--- Theo trạng thái ---</option>
                    )}
                    {categoryList.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </ActionRight>
        </ActionBox>
    );
}

export default Actions;
