import { useState, useEffect } from 'react';
import clsx from 'clsx';
import categoryProductApi from '../../../../api/categoryProductApi';
import brandProductApi from '../../../../api/brandProductApi';
import { invalidInput } from '../../../../hook/validationForm';
import styles from './Form.module.css';
function TabInfo({ active, validates, dataForm, handleSetDataForm }) {
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
    const handleChange = (e) => {
        const formGroupElement = e.target.parentElement;
        if (e.target.attributes.type.value === 'file') {
            if (e.target.attributes.multiple) {
                const array = [];
                for (let i = 0; i < e.target.files.length; i++) {
                    array.push(e.target.files[i]);
                }
                handleSetDataForm({ ...dataForm, [e.target.name]: array });
            } else {
                handleSetDataForm({ ...dataForm, [e.target.name]: e.target.files[0] });
            }
        } else {
            handleSetDataForm({ ...dataForm, [e.target.name]: e.target.value });
        }
        formGroupElement.classList.remove(clsx(styles.invalid));
        formGroupElement.querySelector('.message').innerText = '';
    };
    const handleBlur = (element) => {
        const valide = validates.filter((item) => item.inputName === element.name);
        let message = invalidInput(valide[0].inputName, element.value, valide[0].rules);
        const formGroupElement = element.parentElement;
        if (message) {
            formGroupElement.classList.add(clsx(styles.invalid));
            formGroupElement.querySelector('.message').innerText = message.message;
        } else {
            formGroupElement.classList.remove(clsx(styles.invalid));
            formGroupElement.querySelector('.message').innerText = '';
        }
    };
    return (
        <div className={clsx(styles.tabInfo, { [styles.active]: active })}>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="catePro">Chọn danh mục sản phẩm:</label>
                <select
                    name="category"
                    id="catePro"
                    value={dataForm.category}
                    onChange={(e) =>
                        handleSetDataForm({
                            ...dataForm,
                            category: e.target.options[e.target.options.selectedIndex].value,
                        })
                    }
                    onBlur={(e) => handleBlur(e.target)}
                >
                    <option value="">
                        {isLoadingCate ? '--- Đang tải dữ liệu ---' : '--- Chọn danh mục ---'}
                    </option>
                    {categoryList.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <span className={clsx(styles.errorMessage, 'message')}></span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="brandPro">Chọn thương hiệu:</label>
                <select
                    name="brand"
                    id="brandPro"
                    value={dataForm.brand}
                    onChange={(e) =>
                        handleSetDataForm({
                            ...dataForm,
                            brand: e.target.options[e.target.options.selectedIndex].value,
                        })
                    }
                    onBlur={(e) => handleBlur(e.target)}
                >
                    <option value="">
                        {isLoadingBrand ? '--- Đang tải dữ liệu ---' : '--- Chọn thương hiệu ---'}
                    </option>
                    {brandList.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <span className={clsx(styles.errorMessage, 'message')}></span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="namePro">Tên sản phẩm:</label>
                <input
                    name="name"
                    id="namePro"
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    value={dataForm.name}
                    onChange={handleChange}
                    onBlur={(e) => handleBlur(e.target)}
                />
                <span className={clsx(styles.errorMessage, 'message')}></span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="qtyPro">Số lượng:</label>
                <input
                    name="qty"
                    id="qtyPro"
                    type="text"
                    placeholder="Nhập số lượng sản phẩm"
                    value={dataForm.qty}
                    onChange={handleChange}
                    onBlur={(e) => handleBlur(e.target)}
                />
                <span className={clsx(styles.errorMessage, 'message')}></span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="pricePro">Giá sản phẩm:</label>
                <input
                    name="price"
                    id="pricePro"
                    type="text"
                    placeholder="Nhập giá sản phẩm"
                    value={dataForm.price}
                    onChange={handleChange}
                    onBlur={(e) => handleBlur(e.target)}
                />
                <span className={clsx(styles.errorMessage, 'message')}></span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="salePro">Giảm giá (%):</label>
                <input
                    name="sale"
                    id="salePro"
                    type="text"
                    placeholder="Nhập % giảm giá (0 - 100)"
                    value={dataForm.sale}
                    onChange={handleChange}
                    onBlur={(e) => handleBlur(e.target)}
                />
                <span className={clsx(styles.errorMessage, 'message')}></span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="imgPro">Hình ảnh đại diện:</label>
                <input
                    name="img"
                    id="imgPro"
                    type="file"
                    onChange={handleChange}
                    onBlur={(e) => handleBlur(e.target)}
                />
                <span className={clsx(styles.errorMessage, 'message')}></span>
                {dataForm.typeAction === 'update' && (
                    <i className={clsx(styles.note)}>Để trống hình ảnh nếu không muốn xửa</i>
                )}
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="imgPro2">Hình ảnh chi tiết:</label>
                <input name="imgs" id="imgPro2" type="file" multiple onChange={handleChange} />
                <span className={clsx(styles.errorMessage, 'message')}></span>
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
                        handleSetDataForm({
                            ...dataForm,
                            status: e.target.options[e.target.options.selectedIndex].value,
                        })
                    }
                    onBlur={(e) => handleBlur(e.target)}
                >
                    <option value="0">Không chọn</option>
                    <option value="1">Mới nhất</option>
                    <option value="2">Nổi bật</option>
                </select>
                <span className={clsx(styles.errorMessage, 'message')}></span>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label htmlFor="promotionPro">Khuyến mãi:</label>
                <textarea
                    name="promotion"
                    id="promotionPro"
                    placeholder="Nhập nội dung khuyến mãi"
                    value={dataForm.promotion.join('|')}
                    onChange={(e) =>
                        handleSetDataForm({
                            ...dataForm,
                            promotion: e.target.value.split('|'),
                        })
                    }
                />
                <span className={clsx(styles.errorMessage, 'message')}></span>
                <i className={clsx(styles.note)}>
                    Nếu có nhiều khuyến mãi, hãy cách nhau bằng dấu " | "
                </i>
            </div>
        </div>
    );
}

export default TabInfo;
