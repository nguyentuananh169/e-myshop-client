import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import contactApi from '../../api/contactApi';
import { addNewToastMessage } from '../../redux/actions/toastMessage';
import Path from '../../components/Path';
import Button from '../../components/Button';
import { invalidInput, submitForm } from '../../hook/validationForm';
import styles from './Contact.module.css';
function Contact() {
    const validates = [
        {
            inputName: 'name',
            rules: { required: '', minLength: 6, maxLength: 20 },
        },
        {
            inputName: 'email',
            rules: { required: '', email: '' },
        },
        {
            inputName: 'title',
            rules: { required: '', minLength: 6, maxLength: 30 },
        },
        {
            inputName: 'content',
            rules: { required: '', minLength: 6, maxLength: 100 },
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
    const handleChange = (e) => {
        const formGroupElement = e.target.parentElement;
        setValues({ ...values, [e.target.name]: e.target.value });
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
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) {
            return;
        }
        const elements = e.target.elements;
        const messageError = submitForm(elements, validates);
        if (messageError.length > 0) {
            for (let i = 0; i < messageError.length; i++) {
                const formGroupElement = elements[messageError[i].name].parentElement;
                formGroupElement.classList.add(clsx(styles.invalid));
                formGroupElement.querySelector('span').innerText = messageError[i].message;
            }
        } else {
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
        }
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
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={clsx(styles.heading)}>
                            <h4>Liên hệ với chúng tôi</h4>
                        </div>
                        <div className={clsx(styles.formGroup, styles.w45)}>
                            <label htmlFor="name">Họ và tên *</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Nhập tên của bạn"
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            <span className={clsx('message', styles.errorMessage)}></span>
                        </div>
                        <div className={clsx(styles.formGroup, styles.w45)}>
                            <label htmlFor="email">Email *</label>
                            <input
                                name="email"
                                type="email"
                                value={values.email}
                                placeholder="Nhập email của bạn"
                                id="email"
                                onChange={handleChange}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            <span className={clsx('message', styles.errorMessage)}></span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label htmlFor="title">Tiêu đề *</label>
                            <input
                                name="title"
                                type="text"
                                value={values.title}
                                placeholder="Nhập tiêu đề"
                                id="title"
                                onChange={handleChange}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            <span className={clsx('message', styles.errorMessage)}></span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label htmlFor="content">Nội dung *</label>
                            <textarea
                                name="content"
                                id="content"
                                value={values.content}
                                placeholder="Viết nội dung của bạn"
                                onChange={handleChange}
                                onBlur={(e) => handleBlur(e.target)}
                            ></textarea>
                            <span className={clsx('message', styles.errorMessage)}></span>
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
