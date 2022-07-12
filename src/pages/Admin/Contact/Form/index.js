import { useState } from 'react';
import clsx from 'clsx';
import styles from './Form.module.css';
import Modal from '../../components/Modal';
import Button from '../../../../components/Button';
import useValidateForm from '../../../../hook/useValidateForm';
function Form({ data, isShowForm, handleShowForm, handleReply, isSubmitReply }) {
    const [content, setContent] = useState(data.reply.length ? data.reply[0].c_content : '');
    const validates = [
        { name: 'content', rules: { isRequired: true, minLength: 5, maxLength: 500 } },
    ];
    const handleSubmit = () => {
        if (isSubmitReply) {
            return;
        }
        if (data.c_status === '0') {
            handleReply(data.c_id, content);
        }
    };
    const { errors, removeError, formSubmit, invalid } = useValidateForm(validates, handleSubmit);
    const handleChage = (value) => {
        setContent(value);
        removeError('content');
    };
    return (
        <Modal
            isOpen={isShowForm}
            outerClose
            overlay
            title="Xem và trả lời liên hệ"
            style={{ maxWidth: '700px' }}
            onClose={handleShowForm}
        >
            <form onSubmit={(e) => formSubmit(e, { content })}>
                <div className={clsx(styles.dflex)}>
                    <div className={clsx(styles.formGroup, styles.w47)}>
                        <label htmlFor="name">Họ tên:</label>
                        <input type="text" id="name" value={data.c_name} readOnly />
                    </div>
                    <div className={clsx(styles.formGroup, styles.w47)}>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" value={data.c_email} readOnly />
                    </div>
                </div>
                <div className={clsx(styles.formGroup, styles.mgt)}>
                    <label htmlFor="title">Tiêu đề:</label>
                    <input type="text" id="title" value={data.c_title} readOnly />
                </div>
                <div className={clsx(styles.formGroup, styles.mgt)}>
                    <label htmlFor="content">Nội dung:</label>
                    <textarea id="content" value={data.c_content} readOnly></textarea>
                </div>
                <div className={clsx(styles.formGroup, styles.mgt)}>
                    <label htmlFor="reply">Nội dung trả lời:</label>
                    <textarea
                        id="reply"
                        name="content"
                        value={content}
                        readOnly={data.reply.length}
                        onChange={(e) => handleChage(e.target.value)}
                        onBlur={(e) => invalid('content', e.target.value)}
                    ></textarea>
                    {errors.content && (
                        <span className={clsx(styles.messageError)}>{errors.content}</span>
                    )}
                </div>
                {!data.reply.length && (
                    <div className={clsx(styles.formGroup, styles.mgt, styles.btnSubmit)}>
                        <Button primary loading={isSubmitReply}>
                            <i className="fa fa-pencil-square-o"></i>
                            Gửi nội dung
                        </Button>
                    </div>
                )}
            </form>
        </Modal>
    );
}

export default Form;
