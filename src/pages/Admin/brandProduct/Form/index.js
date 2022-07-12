import clsx from 'clsx';
import Modal from '../../components/Modal';
import Button from '../../../../components/Button';
import useValidateForm from '../../../../hook/useValidateForm';
import styles from './Form.module.css';
function Form({
    isLoadingBtn,
    dataForm,
    categoryList,
    handleSetDataForm,
    isShowForm,
    handleAdd,
    handleShowForm,
    handleUpdate,
}) {
    let validates = [
        {
            name: 'cateId',
            rules: { isRequired: true, maxLength: 100 },
        },
        {
            name: 'name',
            rules: { isRequired: true, maxLength: 30 },
        },
        {
            name: 'img',
            rules: { isRequired: true, isFileImg: true },
        },
    ];
    if (dataForm.typeAction === 'update') {
        validates[2] = {
            name: 'img',
            rules: { isFileImg: true },
        };
    }
    const handleSubmit = async () => {
        if (isLoadingBtn) {
            return;
        }
        if (dataForm.typeAction === 'add') {
            handleAdd();
        } else {
            handleUpdate();
        }
    };
    const { errors, removeError, formSubmit, invalid } = useValidateForm(validates, handleSubmit);
    const handleChange = (name, value) => {
        handleSetDataForm({ ...dataForm, [name]: value });
        removeError(name);
    };
    return (
        <Modal
            isOpen={isShowForm}
            overlay
            outerClose
            onClose={handleShowForm}
            title={dataForm.typeAction === 'add' ? 'Thêm mới thương hiệu' : 'Xửa thương hiệu'}
            animation="rightToLeft"
            style={{
                maxWidth: '418px',
                width: '100%',
                top: 0,
                right: 0,
                height: '100vh',
                margin: '0 0 0 auto',
                borderRadius: 0,
            }}
        >
            <form onSubmit={(e) => formSubmit(e, dataForm)}>
                <div className={clsx(styles.formGroup)}>
                    <label data-type="fullWidth">Chọn danh mục:</label>
                    <select
                        name="cateId"
                        value={dataForm.cateId}
                        onChange={(e) =>
                            handleChange(
                                'cateId',
                                e.target.options[e.target.options.selectedIndex].value,
                            )
                        }
                        onBlur={(e) =>
                            invalid(
                                'cateId',
                                e.target.options[e.target.options.selectedIndex].value,
                            )
                        }
                    >
                        <option value="">--- Chọn danh mục ---</option>
                        {categoryList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <span className={clsx(styles.messageError)}>{errors.cateId}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label data-type="fullWidth" htmlFor="name">
                        Tên thương hiệu:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nhập tên thương hiệu"
                        value={dataForm.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={(e) => invalid('name', e.target.value)}
                    />
                    <span className={clsx(styles.messageError)}>{errors.name}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label data-type="fullWidth">Logo:</label>
                    <input
                        type="file"
                        name="img"
                        onChange={(e) => handleChange('img', e.target.files)}
                        onBlur={(e) => invalid('img', e.target.files)}
                    />
                    <span className={clsx(styles.messageError)}>{errors.img}</span>
                    {dataForm.typeAction === 'update' && (
                        <i className={clsx(styles.note)}>Để trống hình ảnh nếu không muốn xửa</i>
                    )}
                </div>
                <div className={clsx(styles.formGroup)}>
                    {dataForm.typeAction === 'add' ? (
                        <Button primary loading={isLoadingBtn}>
                            <i className="fa fa-plus"></i>Thêm mới
                        </Button>
                    ) : (
                        <Button primary loading={isLoadingBtn}>
                            <i className="fa fa-pencil-square-o"></i>Xửa thương hiệu:
                        </Button>
                    )}
                </div>
            </form>
        </Modal>
    );
}

export default Form;
