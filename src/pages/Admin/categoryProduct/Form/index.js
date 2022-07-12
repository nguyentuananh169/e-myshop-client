import clsx from 'clsx';
import Modal from '../../components/Modal';
import Button from '../../../../components/Button';
import useValidateForm from '../../../../hook/useValidateForm';
import styles from './Form.module.css';
function Form({
    isLoadingBtn,
    stateForm,
    handleSetStateForm,
    isShowForm,
    handleAdd,
    handleShowForm,
    handleUpdate,
}) {
    let validates = [
        {
            name: 'name',
            rules: { isRequired: true, maxLength: 30 },
        },
        {
            name: 'img',
            rules: { isRequired: true, isFileImg: true },
        },
        {
            name: 'status',
            rules: { isRequired: true },
        },
    ];
    if (stateForm.typeAction === 'update') {
        validates[1] = {
            name: 'img',
            rules: { isFileImg: true },
        };
    }
    const handleSubmit = async (e) => {
        if (isLoadingBtn) {
            return;
        }
        if (stateForm.typeAction === 'add') {
            handleAdd();
        } else {
            handleUpdate();
        }
    };
    const { errors, removeError, formSubmit, invalid } = useValidateForm(validates, handleSubmit);
    const handleChange = (name, value) => {
        handleSetStateForm({ ...stateForm, [name]: value });
        removeError(name);
    };
    return (
        <Modal
            isOpen={isShowForm}
            overlay
            outerClose
            onClose={handleShowForm}
            title={stateForm.typeAction === 'add' ? 'Thêm mới danh mục' : 'Xửa danh mục'}
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
            <form onSubmit={(e) => formSubmit(e, stateForm)}>
                <div className={clsx(styles.formGroup)}>
                    <label data-type="fullWidth" htmlFor="name">
                        Tên danh mục:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nhập tên danh mục"
                        value={stateForm.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={(e) => invalid('name', e.target.value)}
                    />
                    <span className={clsx(styles.messageError, 'message')}>{errors.name}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label data-type="fullWidth" htmlFor="img">
                        Hình ảnh:
                    </label>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        onChange={(e) => handleChange('img', e.target.files)}
                        onBlur={(e) => invalid('img', e.target.files)}
                    />
                    <span className={clsx(styles.messageError, 'message')}>{errors.img}</span>
                    {stateForm.typeAction === 'update' && (
                        <i className={clsx(styles.note)}>Để trống hình ảnh nếu không muốn xửa</i>
                    )}
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label data-type="fullWidth" htmlFor="status">
                        Trạng thái:
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={stateForm.status}
                        onChange={(e) =>
                            handleChange(
                                'status',
                                e.target.options[e.target.options.selectedIndex].value,
                            )
                        }
                        onBlur={(e) =>
                            invalid(
                                'status',
                                e.target.options[e.target.options.selectedIndex].value,
                            )
                        }
                    >
                        <option value="0">Hiển thị</option>
                        <option value="1">Ẩn</option>
                    </select>
                    <span className={clsx(styles.messageError, 'message')}>{errors.status}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    {stateForm.typeAction === 'add' ? (
                        <Button primary loading={isLoadingBtn}>
                            <i className="fa fa-plus"></i>Thêm mới
                        </Button>
                    ) : (
                        <Button primary loading={isLoadingBtn}>
                            <i className="fa fa-pencil-square-o"></i>Xửa danh mục
                        </Button>
                    )}
                </div>
            </form>
        </Modal>
    );
}

export default Form;
