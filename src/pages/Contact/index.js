import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import contactApi from '../../api/contactApi';
import { addNewToastMessage } from '../../redux/actions/toastMessage';
import Path from '../../components/Path';
import Button from '../../components/Button';
import useValidateForm from '../../hook/useValidateForm';
import styles from './Contact.module.css';
function Contact() {
    const validates = [
        {
            name: 'name',
            rules: { isRequired: true, minLength: 6, maxLength: 20 },
        },
        {
            name: 'email',
            rules: { isRequired: true, isEmail: true },
        },
        {
            name: 'title',
            rules: { isRequired: true, minLength: 6, maxLength: 30 },
        },
        {
            name: 'content',
            rules: { isRequired: true, minLength: 6, maxLength: 100 },
        },
    ];
    const [isLoading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        title: '',
        content: '',
    });
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        if (user) {
            setValues({ ...values, name: user.user_name, email: user.user_email });
        }
    }, []);

    const handleSubmit = async () => {
        if (isLoading) {
            return;
        }
        setLoading(true);
        const params = new FormData();
        params.append('_name', values.name);
        params.append('_email', values.email);
        params.append('_title', values.title);
        params.append('_content', values.content);
        const response = await contactApi.add(params);
        setLoading(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
        setValues({ ...values, title: '', content: '' });
    };
    const { errors, removeError, formSubmit, invalid } = useValidateForm(validates, handleSubmit);
    const handleChange = (name, value) => {
        setValues({ ...values, [name]: value });
        removeError(name);
    };
    const path = [
        {
            name: 'Liên hệ',
            url: '#',
        },
    ];
    return (
        <>
            <Path path={path} />
            <div className="container">
                <div className={clsx(styles.wrapper)}>
                    <form onSubmit={(e) => formSubmit(e, values)}>
                        <div className={clsx(styles.heading)}>
                            <h4>Liên hệ với chúng tôi</h4>
                        </div>
                        <div
                            className={clsx(styles.formGroup, styles.w45, {
                                [styles.invalid]: errors.name,
                            })}
                        >
                            <label htmlFor="name">Họ và tên *</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Nhập tên của bạn"
                                id="name"
                                value={values.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                onBlur={(e) => invalid('name', e.target.value)}
                            />
                            <span className={clsx(styles.errorMessage)}>{errors.name}</span>
                        </div>
                        <div
                            className={clsx(styles.formGroup, styles.w45, {
                                [styles.invalid]: errors.email,
                            })}
                        >
                            <label htmlFor="email">Email *</label>
                            <input
                                name="email"
                                type="email"
                                value={values.email}
                                placeholder="Nhập email của bạn"
                                id="email"
                                onChange={(e) => handleChange('email', e.target.value)}
                                onBlur={(e) => invalid('email', e.target.value)}
                            />
                            <span className={clsx(styles.errorMessage)}>{errors.email}</span>
                        </div>
                        <div className={clsx(styles.formGroup, { [styles.invalid]: errors.title })}>
                            <label htmlFor="title">Tiêu đề *</label>
                            <input
                                name="title"
                                type="text"
                                value={values.title}
                                placeholder="Nhập tiêu đề"
                                id="title"
                                onChange={(e) => handleChange('title', e.target.value)}
                                onBlur={(e) => invalid('title', e.target.value)}
                            />
                            <span className={clsx(styles.errorMessage)}>{errors.title}</span>
                        </div>
                        <div
                            className={clsx(styles.formGroup, { [styles.invalid]: errors.content })}
                        >
                            <label htmlFor="content">Nội dung *</label>
                            <textarea
                                name="content"
                                id="content"
                                value={values.content}
                                placeholder="Viết nội dung của bạn"
                                onChange={(e) => handleChange('content', e.target.value)}
                                onBlur={(e) => invalid('content', e.target.value)}
                            ></textarea>
                            <span className={clsx(styles.errorMessage)}>{errors.content}</span>
                        </div>
                        <div className={clsx(styles.submit)}>
                            <Button outline primary loading={isLoading && 'Đang gửi tin nhắn'}>
                                <i className="fa fa-envelope-o"></i>
                                Gửi tin nhắn
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Contact;
