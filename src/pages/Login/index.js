import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Button from '../../components/Button';
import Path from '../../components/Path';
import authApi from '../../api/authApi';
import { addNewToastMessage } from '../../redux/actions/toastMessage';
import { authLogin } from '../../redux/actions/auth';
import { invalidInput, submitForm } from '../../hook/validationForm';
import styles from './Login.module.css';
function Login() {
    const validates = [
        {
            inputName: 'email',
            rules: { required: '' },
        },
        {
            inputName: 'password',
            rules: { required: '' },
        },
    ];
    const [isLoading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            params.append('_email', values.email);
            params.append('_password', values.password);
            const response = await authApi.loginMember(params);
            if (response[0].error === 1) {
                setLoading(false);
                return dispatch(
                    addNewToastMessage('error', 'Đăng nhập thất bại', response[0].message),
                );
            }
            dispatch(
                authLogin({
                    access_token: response[0].access_token,
                    user: response[0].user,
                    isAuthentication: response[0].auth,
                    isAdmin: response[0].admin,
                    baseURLImg: response[0].baseURLImg,
                }),
            );
            localStorage.setItem('access_token', JSON.stringify(response[0].access_token));
            dispatch(addNewToastMessage('success', 'Đăng nhập thành công', 'Chào mừng bạn'));
            navigate('/', { replace: true });
        }
    };
    const checkLogin = useSelector((state) => state.auth.isAuthentication);
    if (checkLogin) {
        return <Navigate to="/" />;
    }
    const path = [
        {
            name: 'Đăng nhập',
            url: '/account/login',
        },
    ];
    return (
        <>
            <Path path={path} />
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className={clsx(styles.wrapper)}>
                        <h2 className={clsx(styles.heading)}>Đăng nhập</h2>
                        <div className={clsx(styles.form)}>
                            <div className={clsx(styles.formGroup)}>
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Nhập Email ..."
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                <span className={clsx('message', styles.errorMessage)}></span>
                            </div>
                            <div className={clsx(styles.formGroup)}>
                                <label>Mật khẩu</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu ..."
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                <span className={clsx('message', styles.errorMessage)}></span>
                            </div>
                            <div className={clsx(styles.formGroup)}>
                                <Button
                                    loading={isLoading && 'Đang đăng nhập...'}
                                    primary
                                    fullWidth
                                >
                                    <i className="fa fa-sign-in"></i>ĐĂNG NHẬP
                                </Button>
                            </div>
                            <Link to="#">
                                <i className="fa fa-key"></i>Quên mật khẩu?
                            </Link>
                            <Link to="/dang-ky">
                                <i className="fa fa-user-plus"></i>Tạo tài khoản
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
