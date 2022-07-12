import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Modal from '../../components/Modal';
import Button from '../../../../components/Button';
import styles from './Form.module.css';
import TabInfo from './TabInfo';
import TabAttribute from './TabAttribute';
import TabDescription from './TabDescription';
import useValidateForm from '../../../../hook/useValidateForm';
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
            name: 'category',
            rules: { isRequired: true },
        },
        {
            name: 'brand',
            rules: { isRequired: true },
        },
        {
            name: 'name',
            rules: { isRequired: true, minLength: 6, maxLength: 100 },
        },
        {
            name: 'qty',
            rules: { isRequired: true, isInteger: true, minNumber: 1 },
        },
        {
            name: 'price',
            rules: { isRequired: true, isInteger: true, minNumber: 1 },
        },
        {
            name: 'sale',
            rules: { minNumber: 0, isInteger: true, minNumber: 0, maxNumber: 100 },
        },
        {
            name: 'img',
            rules: { isRequired: true, isFileImg: true },
        },
        {
            name: 'imgs',
            rules: { isFileImg: true, maxFile: 10 },
        },
    ];
    if (dataForm.typeAction === 'update') {
        validates[6] = {
            name: 'img',
            rules: { isFileImg: true },
        };
    }
    const [tabActive, setTabActive] = useState(0);
    const [widthLine, setWidthLine] = useState(0);
    const buttonRef = useRef(null);
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
    const handleSubmit = async () => {
        if (isLoadingSubmit) {
            return;
        }
        handleSubmitForm(dataForm.typeAction);
    };
    const { errors, removeError, formSubmit, invalid } = useValidateForm(validates, handleSubmit);
    const handleChange = (name, value) => {
        if (name === 'category') {
            handleSetDataForm({ ...dataForm, category: value, brand: '' });
        } else {
            handleSetDataForm({ ...dataForm, [name]: value });
        }
        removeError(name);
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
                <form onSubmit={(e) => formSubmit(e, dataForm)}>
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
                            dataForm={dataForm}
                            handleChange={handleChange}
                            invalid={invalid}
                            errors={errors}
                        />
                        <TabAttribute
                            active={tabActive === 1}
                            dataForm={dataForm}
                            handleChange={handleChange}
                        />
                        <TabDescription
                            active={tabActive === 2}
                            dataForm={dataForm}
                            handleChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default Form;
