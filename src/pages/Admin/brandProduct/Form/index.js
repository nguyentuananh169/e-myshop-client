import clsx from 'clsx';
import Modal from '../../components/Modal';
import Button from '../../../../components/Button';
import { invalidInput, submitForm } from '../../../../hook/validationForm';
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
            inputName: 'categoryId',
            rules: { required: '' },
        },
        {
            inputName: 'name',
            rules: { required: '', maxLength: 30 },
        },
        {
            inputName: 'img',
            rules: { required: '', fileImg: '' },
        },
    ];
    if (dataForm.typeAction === 'update') {
        validates[2] = {
            inputName: 'img',
            rules: { fileImg: '' },
        };
    }
    const handleChange = (e) => {
        const formGroupElement = e.target.parentElement;
        if (e.target.attributes.type.value === 'file') {
            handleSetDataForm({ ...dataForm, [e.target.name]: e.target.files[0] });
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoadingBtn) {
            return;
        }
        const elements = e.target.elements;
        const messageError = submitForm(elements, validates);
        if (messageError.length > 0) {
            for (let i = 0; i < messageError.length; i++) {
                const formGroupElement = elements[messageError[i].name].parentElement;
                formGroupElement.classList.add(clsx(styles.invalid));
                formGroupElement.querySelector('.message').innerText = messageError[i].message;
            }
        } else {
            if (dataForm.typeAction === 'add') {
                handleAdd();
            } else {
                handleUpdate();
            }
        }
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
            <form onSubmit={handleSubmit}>
                <div className={clsx(styles.formGroup)}>
                    <label data-type="fullWidth">Chọn danh mục:</label>
                    <select
                        name="categoryId"
                        value={dataForm.cateId}
                        onChange={(e) =>
                            handleSetDataForm({
                                ...dataForm,
                                cateId: e.target.options[e.target.options.selectedIndex].value,
                            })
                        }
                        onBlur={(e) => handleBlur(e.target)}
                    >
                        <option value="">--- Chọn danh mục ---</option>
                        {categoryList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <span className={clsx(styles.messageError, 'message')}></span>
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
                        onChange={handleChange}
                        onBlur={(e) => handleBlur(e.target)}
                    />
                    <span className={clsx(styles.messageError, 'message')}></span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label data-type="fullWidth">Logo:</label>
                    <input
                        type="file"
                        name="img"
                        onChange={handleChange}
                        onBlur={(e) => handleBlur(e.target)}
                    />
                    <span className={clsx(styles.messageError, 'message')}></span>
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
