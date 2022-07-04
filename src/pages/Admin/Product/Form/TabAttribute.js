import { Fragment } from 'react';
import clsx from 'clsx';
import styles from './Form.module.css';
import Button from '../../../../components/Button';
function TabAttribute({ active, dataForm, handleSetDataForm }) {
    const handleSetAtrr = () => {
        const date = new Date();
        const id = date.getTime();
        handleSetDataForm({
            ...dataForm,
            attr: [...dataForm.attr, { id: id, type: '', value: [] }],
        });
    };
    const handleRemoveAttr = (id) => {
        const arrayAttr = dataForm.attr.filter((item) => item.id !== id);
        handleSetDataForm({
            ...dataForm,
            attr: arrayAttr,
        });
    };
    const handleChangeTypeAttr = (index, value) => {
        let attrList = dataForm.attr;
        let attr = attrList[index];
        let attr2 = { ...attr, type: value };
        attrList[index] = attr2;
        handleSetDataForm({
            ...dataForm,
            attr: attrList,
        });
    };
    const handleChangeValueAttr = (index, value) => {
        let attrList = dataForm.attr;
        let attr = attrList[index];
        let attr2 = { ...attr, value: value.split('|') };
        attrList[index] = attr2;
        handleSetDataForm({
            ...dataForm,
            attr: attrList,
        });
    };
    return (
        <div className={clsx(styles.tabAttribute, { [styles.active]: active })}>
            <Button type="button" primary onClick={handleSetAtrr}>
                <i className="fa fa-plus"></i>Thêm thuộc tính
            </Button>
            <div className={clsx(styles.attrList)}>
                {dataForm.attr.map((item, index) => (
                    <Fragment key={item.id}>
                        <div className={clsx(styles.attrItem)}>
                            <input
                                type="text"
                                placeholder="Nhập tên thuộc tính"
                                className={clsx(styles.title)}
                                value={item.type}
                                onChange={(e) => handleChangeTypeAttr(index, e.target.value)}
                            />
                            <textarea
                                placeholder="Nhập giá trị thuộc tính"
                                className={clsx(styles.value)}
                                value={item.value.join('|')}
                                onChange={(e) => handleChangeValueAttr(index, e.target.value)}
                            ></textarea>
                            <Button type="button" danger onClick={() => handleRemoveAttr(item.id)}>
                                <i className="fa fa-times"></i>
                            </Button>
                        </div>
                        <i className={clsx(styles.note, styles.attr)}>
                            Nếu có nhiều thuộc tính, hãy các nhau bằng dấu " | "
                        </i>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default TabAttribute;
