import clsx from 'clsx';
import styles from './Form.module.css';
import Modal from '../../components/Modal';
import Button from '../../../../components/Button';
import useValidateForm from '../../../../hook/useValidateForm';
function Form({
    data,
    isShowForm,
    handleSetDataBanner,
    handleShowForm,
    handleUpdate,
    handleAdd,
    isSubmit,
}) {
    const validates = [
        { name: 'img', rules: { isRequired: true, isFileImg: true } },
        { name: 'link', rules: { isRequired: true, maxLength: 255 } },
    ];
    if (data.typeAction === 'update') {
        validates[0] = { name: 'img', rules: { isFileImg: true } };
    }
    const handleSubmit = () => {
        if (isSubmit) {
            return;
        }
        if (data.typeAction === 'add') {
            handleAdd();
        } else if (data.typeAction === 'update') {
            handleUpdate();
        }
    };
    const { errors, removeError, formSubmit, invalid } = useValidateForm(validates, handleSubmit);
    const handleChange = (name, value) => {
        handleSetDataBanner({ ...data, [name]: value });
        removeError(name);
    };
    return (
        <Modal
            isOpen={isShowForm}
            overlay
            outerClose
            onClose={handleShowForm}
            title={data.typeAction === 'add' ? 'Thêm mới' : 'Xửa banner'}
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
            <form onSubmit={(e) => formSubmit(e, data)}>
                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="imgBN">Hình ảnh:</label>
                    <input
                        type="file"
                        id="imgBN"
                        name="img"
                        onChange={(e) => handleChange('img', e.target.files)}
                        onBlur={(e) => invalid('img', e.target.files)}
                    />
                    {data.typeAction === 'update' && (
                        <i className={clsx(styles.note)}>Để trống hình ảnh nếu không muốn xửa</i>
                    )}
                    {errors.img && <i className={clsx(styles.messageError)}>{errors.img}</i>}
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="linkBN">Link:</label>
                    <input
                        type="text"
                        id="linkBN"
                        placeholder="Nhập link..."
                        name="link"
                        value={data.link}
                        onChange={(e) => handleChange('link', e.target.value)}
                        onBlur={(e) => invalid('link', e.target.value)}
                    />
                    {errors.link && <i className={clsx(styles.messageError)}>{errors.link}</i>}
                </div>
                <div className={clsx(styles.formGroup)}>
                    <Button
                        success={data.typeAction === 'update'}
                        primary={data.typeAction === 'add'}
                        loading={isSubmit}
                    >
                        {data.typeAction === 'add' && (
                            <>
                                <i className="fa fa-plus"></i>
                                Thêm mới
                            </>
                        )}
                        {data.typeAction === 'update' && (
                            <>
                                <i className="fa fa-edit"></i>
                                Xửa banner
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default Form;
