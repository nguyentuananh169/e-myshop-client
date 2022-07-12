import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Modal from '../../components/Modal';
import Button from '../../../../components/Button';
import styles from './Form.module.css';
import TabInfo from './TabInfo';
import TabContent from './TabContent';
import useValidateForm from '../../../../hook/useValidateForm';

function Form({
    categoryList,
    isShowForm,
    isLoadingSubmit,
    dataForm,
    handleShowForm,
    handleSetDataForm,
    handleAdd,
    handleUpdate,
}) {
    const validates = [
        {
            name: 'cateId',
            rules: { isRequired: true },
        },
        {
            name: 'title',
            rules: { isRequired: true, minLength: 15, maxLength: 150 },
        },
        {
            name: 'summary',
            rules: { isRequired: true, minLength: 15, maxLength: 300 },
        },
        {
            name: 'img',
            rules: { isRequired: true, isFileImg: true },
        },
        {
            name: 'content',
            rules: { isRequired: true },
        },
    ];
    if (dataForm.typeAction === 'update') {
        validates[3] = {
            name: 'img',
            rules: { isFileImg: true },
        };
    }
    const [tabActive, setTabActive] = useState(0);
    const [widthLine, setWidthLine] = useState(0);
    const buttonRef = useRef(null);

    useEffect(() => {
        setWidthLine(buttonRef.current.clientWidth);
    }, []);
    const handleSubmit = () => {
        if (isLoadingSubmit) {
            return;
        }
        if (dataForm.typeAction === 'add') {
            handleAdd();
        } else if (dataForm.typeAction === 'update') {
            handleUpdate();
        }
    };
    const { errors, removeError, invalid, formSubmit } = useValidateForm(validates, handleSubmit);
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
            title="Thêm mới tin tức"
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
                                Nội dung chính
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
                                    <i className="fa fa-plus"></i>Thêm tin tức
                                </Button>
                            )}
                            {dataForm.typeAction === 'update' && (
                                <Button success loading={isLoadingSubmit}>
                                    <i className="fa fa-pencil-square-o"></i>Xửa tin tức
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className={clsx(styles.main, 'custom-scrollbars')}>
                        <TabInfo
                            active={tabActive === 0}
                            dataForm={dataForm}
                            categoryList={categoryList}
                            handleChange={handleChange}
                            invalid={invalid}
                            errors={errors}
                        />
                        <TabContent
                            active={tabActive === 1}
                            dataForm={dataForm}
                            handleChange={handleChange}
                            errors={errors}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default Form;
