import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import Modal from '../../components/Modal';
import Button from '../../../../components/Button';
import styles from './Form.module.css';
import TabInfo from './TabInfo';
import TabAttribute from './TabAttribute';
import TabDescription from './TabDescription';
import { submitForm } from '../../../../hook/validationForm';
import { addNewToastMessage } from '../../../../redux/actions/toastMessage';
function Form({
    isLoadingSubmit,
    isShowForm,
    dataForm,
    handleShowForm,
    handleSubmitForm,
    handleSetDataForm,
}) {
    let validates = [
        {
            inputName: 'category',
            rules: { required: '' },
        },
        {
            inputName: 'brand',
            rules: { required: '' },
        },
        {
            inputName: 'name',
            rules: { required: '', maxLength: 100 },
        },
        {
            inputName: 'qty',
            rules: { required: '', minNumber: 0 },
        },
        {
            inputName: 'price',
            rules: { required: '', numberInteger: '' },
        },
        {
            inputName: 'sale',
            rules: { minNumber: 0, maxNumber: 100 },
        },
        {
            inputName: 'img',
            rules: { required: '', fileImg: '' },
        },
        {
            inputName: 'status',
            rules: { required: '' },
        },
    ];
    if (dataForm.typeAction === 'update') {
        validates[6] = {
            inputName: 'img',
            rules: { fileImg: '' },
        };
    }
    const [tabActive, setTabActive] = useState(0);
    const [widthLine, setWidthLine] = useState(0);
    const buttonRef = useRef(null);
    const dispatch = useDispatch();
    const elementTitle =
        dataForm.typeAction === 'add' ? (
            <>Thêm sản phẩm</>
        ) : (
            <>
                Xửa sản phẩm <span style={{ color: '#2eb85c' }}>{dataForm.name}</span>
            </>
        );

    useEffect(() => {
        setWidthLine(buttonRef.current.clientWidth);
    }, []);
    const handleClose = () => {
        setTabActive(0);
        handleShowForm();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoadingSubmit) {
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
            dispatch(
                addNewToastMessage('error', 'Thất bại', 'Thông tin chưa nhập đủ hoặc chưa hợp lệ'),
            );
        } else {
            handleSubmitForm(dataForm.typeAction);
        }
    };
    return (
        <Modal
            isOpen={isShowForm}
            overlay
            outerClose
            onClose={handleClose}
            title={elementTitle}
            style={{ maxWidth: '900px' }}
        >
            <div className={clsx(styles.wrapper)}>
                <form onSubmit={handleSubmit}>
                    <div className={clsx(styles.buttonGroup)}>
                        <div className={clsx(styles.tabs)}>
                            <button
                                type="button"
                                ref={buttonRef}
                                className={clsx(styles.tab, { [styles.active]: tabActive === 0 })}
                                onClick={() => setTabActive(0)}
                            >
                                Thông tin chính
                            </button>
                            <button
                                type="button"
                                className={clsx(styles.tab, { [styles.active]: tabActive === 1 })}
                                onClick={() => setTabActive(1)}
                            >
                                Thuộc tính
                            </button>
                            <button
                                type="button"
                                className={clsx(styles.tab, { [styles.active]: tabActive === 2 })}
                                onClick={() => setTabActive(2)}
                            >
                                Mô tả sản phẩm
                            </button>
                            <div
                                className={clsx(styles.line)}
                                style={{
                                    width: `${widthLine}px`,
                                    marginLeft: `${widthLine * tabActive}px`,
                                }}
                            ></div>
                        </div>
                        <div className={clsx(styles.submit)}>
                            {dataForm.typeAction === 'add' && (
                                <Button primary loading={isLoadingSubmit}>
                                    <i className="fa fa-plus"></i>Thêm sản phẩm
                                </Button>
                            )}
                            {dataForm.typeAction === 'update' && (
                                <Button success loading={isLoadingSubmit}>
                                    <i className="fa fa-pencil-square-o"></i>Xửa sản phẩm
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className={clsx(styles.main, 'custom-scrollbars')}>
                        <TabInfo
                            active={tabActive === 0}
                            validates={validates}
                            dataForm={dataForm}
                            handleSetDataForm={handleSetDataForm}
                        />
                        <TabAttribute
                            active={tabActive === 1}
                            dataForm={dataForm}
                            handleSetDataForm={handleSetDataForm}
                        />
                        <TabDescription
                            active={tabActive === 2}
                            dataForm={dataForm}
                            handleSetDataForm={handleSetDataForm}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default Form;
