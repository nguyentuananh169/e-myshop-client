import clsx from 'clsx';
import styles from './Form.module.css';
function TabInfo({ active, dataForm, categoryList, handleChange, invalid, errors }) {
    return (
        <div className={clsx(styles.tabInfo, { [styles.active]: active })}>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="cateNews">Chọn danh mục:</label>
                <select
                    name="cateId"
                    id="cateNews"
                    value={dataForm.cateId}
                    onChange={(e) =>
                        handleChange(
                            'cateId',
                            e.target.options[e.target.options.selectedIndex].value,
                        )
                    }
                    onBlur={(e) =>
                        invalid('cateId', e.target.options[e.target.options.selectedIndex].value)
                    }
                >
                    <option value="">--- Chọn danh mục ---</option>
                    {categoryList.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                {errors.cateId && (
                    <span className={clsx(styles.errorMessage)}>{errors.cateId}</span>
                )}
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="titleNews">Tiêu đề:</label>
                <input
                    id="titleNews"
                    name="title"
                    type="text"
                    placeholder="Nhập tiêu đề..."
                    value={dataForm.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    onBlur={(e) => invalid('title', e.target.value)}
                />
                {errors.title && <span className={clsx(styles.errorMessage)}>{errors.title}</span>}
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="summaryNews">Tóm tắt:</label>
                <textarea
                    name="summary"
                    id="summaryNews"
                    placeholder="Tóm tắt nội dung..."
                    value={dataForm.summary}
                    onChange={(e) => handleChange('summary', e.target.value)}
                    onBlur={(e) => invalid('summary', e.target.value)}
                ></textarea>
                {errors.summary && (
                    <span className={clsx(styles.errorMessage)}>{errors.summary}</span>
                )}
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="imgNews">Hình ảnh đại diện:</label>
                <input
                    name="img"
                    id="imgNews"
                    type="file"
                    onChange={(e) => handleChange('img', e.target.files)}
                    onBlur={(e) => invalid('img', e.target.files)}
                />
                {errors.img && <span className={clsx(styles.errorMessage)}>{errors.img}</span>}
                {dataForm.typeAction === 'update' && (
                    <i className={clsx(styles.note)}>Để trống hình ảnh nếu không muốn xửa</i>
                )}
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="statusNews">Trạng thái:</label>
                <select
                    name="status"
                    id="statusNews"
                    value={dataForm.status}
                    onChange={(e) =>
                        handleChange(
                            'status',
                            e.target.options[e.target.options.selectedIndex].value,
                        )
                    }
                    onBlur={(e) =>
                        invalid('status', e.target.options[e.target.options.selectedIndex].value)
                    }
                >
                    <option value="0">Hiển thị</option>
                    <option value="1">Ẩn</option>
                </select>
            </div>
        </div>
    );
}

export default TabInfo;
