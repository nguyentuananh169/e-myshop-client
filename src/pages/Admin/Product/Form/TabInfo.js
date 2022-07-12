import { useState, useEffect } from 'react';
import clsx from 'clsx';
import categoryProductApi from '../../../../api/categoryProductApi';
import brandProductApi from '../../../../api/brandProductApi';
import styles from './Form.module.css';
function TabInfo({ active, invalid, dataForm, handleChange, errors }) {
    const [isLoadingCate, setLoadingCate] = useState(true);
    const [isLoadingBrand, setLoadingBrand] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    useEffect(() => {
        const fetchCategoryProduct = async () => {
            setLoadingCate(true);
            const response = await categoryProductApi.getAll();
            setLoadingCate(false);
            setCategoryList(response);
        };
        fetchCategoryProduct();
    }, []);
    useEffect(() => {
        if (dataForm.category) {
            const fetchBrandProduct = async () => {
                setLoadingBrand(true);
                const response = await brandProductApi.getCateId(dataForm.category);
                setLoadingBrand(false);
                setBrandList(response.dataBrand);
            };
            fetchBrandProduct();
        }
    }, [dataForm.category]);
    return (
        <div className={clsx(styles.tabInfo, { [styles.active]: active })}>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="catePro">Chọn danh mục sản phẩm:</label>
                <select
                    name="category"
                    id="catePro"
                    value={dataForm.category}
                    onChange={(e) =>
                        handleChange(
                            'category',
                            e.target.options[e.target.options.selectedIndex].value,
                        )
                    }
                    onBlur={(e) =>
                        invalid('category', e.target.options[e.target.options.selectedIndex].value)
                    }
                >
                    <option value="">
                        {isLoadingCate ? '--- Đang tải dữ liệu ---' : '--- Chọn danh mục ---'}
                    </option>
                    {!isLoadingCate &&
                        categoryList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                </select>
                <span className={clsx(styles.errorMessage)}>{errors.category}</span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="brandPro">Chọn thương hiệu:</label>
                <select
                    name="brand"
                    id="brandPro"
                    value={dataForm.brand}
                    onChange={(e) =>
                        handleChange(
                            'brand',
                            e.target.options[e.target.options.selectedIndex].value,
                        )
                    }
                    onBlur={(e) =>
                        invalid('brand', e.target.options[e.target.options.selectedIndex].value)
                    }
                >
                    <option value="">
                        {isLoadingBrand ? '--- Đang tải dữ liệu ---' : '--- Chọn thương hiệu ---'}
                    </option>
                    {!isLoadingBrand &&
                        brandList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                </select>
                <span className={clsx(styles.errorMessage)}>{errors.brand}</span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="namePro">Tên sản phẩm:</label>
                <input
                    name="name"
                    id="namePro"
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    value={dataForm.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={(e) => invalid('name', e.target.value)}
                />
                <span className={clsx(styles.errorMessage)}>{errors.name}</span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="qtyPro">Số lượng:</label>
                <input
                    name="qty"
                    id="qtyPro"
                    type="text"
                    placeholder="Nhập số lượng sản phẩm"
                    value={dataForm.qty}
                    onChange={(e) => handleChange('qty', e.target.value)}
                    onBlur={(e) => invalid('qty', e.target.value)}
                />
                <span className={clsx(styles.errorMessage)}>{errors.qty}</span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="pricePro">Giá sản phẩm:</label>
                <input
                    name="price"
                    id="pricePro"
                    type="text"
                    placeholder="Nhập giá sản phẩm"
                    value={dataForm.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    onBlur={(e) => invalid('price', e.target.value)}
                />
                <span className={clsx(styles.errorMessage)}>{errors.price}</span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="salePro">Giảm giá (%):</label>
                <input
                    name="sale"
                    id="salePro"
                    type="text"
                    placeholder="Nhập % giảm giá (0 - 100)"
                    value={dataForm.sale}
                    onChange={(e) => handleChange('sale', e.target.value)}
                    onBlur={(e) => invalid('sale', e.target.value)}
                />
                <span className={clsx(styles.errorMessage)}>{errors.sale}</span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="imgPro">Hình ảnh đại diện:</label>
                <input
                    name="img"
                    id="imgPro"
                    type="file"
                    onChange={(e) => handleChange('img', e.target.files)}
                    onBlur={(e) => invalid('img', e.target.files)}
                />
                <span className={clsx(styles.errorMessage)}>{errors.img}</span>
                {dataForm.typeAction === 'update' && (
                    <i className={clsx(styles.note)}>Để trống hình ảnh nếu không muốn xửa</i>
                )}
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="imgPro2">Hình ảnh chi tiết:</label>
                <input
                    name="imgs"
                    id="imgPro2"
                    type="file"
                    multiple
                    onChange={(e) => handleChange('imgs', e.target.files)}
                    onBlur={(e) => invalid('imgs', e.target.files)}
                />
                <span className={clsx(styles.errorMessage)}>{errors.imgs}</span>
                {dataForm.typeAction === 'update' && (
                    <i className={clsx(styles.note)}>Để trống hình ảnh nếu không muốn xửa</i>
                )}
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="statusPro">Trạng thái:</label>
                <select
                    name="status"
                    id="statusPro"
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
                    <option value="0">Không chọn</option>
                    <option value="1">Mới nhất</option>
                    <option value="2">Nổi bật</option>
                </select>
                <span className={clsx(styles.errorMessage)}>{errors.status}</span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="promotionPro">Khuyến mãi:</label>
                <textarea
                    name="promotion"
                    id="promotionPro"
                    placeholder="Nhập nội dung khuyến mãi"
                    value={dataForm.promotion.join('|')}
                    onChange={(e) => handleChange('promotion', e.target.value.split('|'))}
                />
                <span className={clsx(styles.errorMessage)}></span>
                <i className={clsx(styles.note)}>
                    Nếu có nhiều khuyến mãi, hãy cách nhau bằng dấu " | "
                </i>
            </div>
        </div>
    );
}

export default TabInfo;
