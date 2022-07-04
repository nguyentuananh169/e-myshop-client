import clsx from 'clsx';
import Modal from '../../components/Modal';
import Button from '../../../../components/Button';
import { invalidInput, submitForm } from '../../../../hook/validationForm';
import useForm from '../../../../hook/useForm';
import styles from './Form.module.css';
function Form({
    isLoadingBtn,
    dataForm,
    // handleSetStateForm,
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
            name: 'status',
            rules: { isRequired: true },
        },
    ];
    const { errors, values, formChange, invalid, formSubmit } = useForm(validates);
    const handleSubmit = (values1) => {
        // if (isLoadingBtn) {
        //     return;
        // }
        // if (dataForm.typeAction === 'add') {
        //     handleAdd(values);
        // } else if (dataForm.typeAction === 'update') {
        //     handleUpdate(values);
        // }
        console.log(values1);
    };
    return (
        <Modal
            isOpen={isShowForm}
            overlay
            outerClose
            onClose={handleShowForm}
            title={dataForm.typeAction === 'add' ? 'Thêm mới danh mục' : 'Xửa danh mục'}
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
            <form onSubmit={(e) => formSubmit(e, handleSubmit)}>
                <div className={clsx(styles.formGroup)}>
                    <label data-type="fullWidth" htmlFor="name">
                        Tên danh mục:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nhập tên danh mục"
                        defaultValue={dataForm.name}
                        // value={stateForm.name}
                        onChange={(e) => formChange('name', e.target.value)}
                        onBlur={(e) => invalid('name', e.target.value)}
                    />
                    <span className={clsx(styles.messageError)}>{errors.name}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label data-type="fullWidth" htmlFor="status">
                        Trạng thái:
                    </label>
                    <select
                        id="status"
                        name="status"
                        defaultValue={dataForm.status}
                        // value={stateForm.status}
                        onChange={(e) =>
                            formChange(
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
                    <span className={clsx(styles.messageError)}>{errors.status}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    {dataForm.typeAction === 'add' ? (
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
