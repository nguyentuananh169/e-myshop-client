import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Button from '../../components/Button';
import Path from '../../components/Path';
import authApi from '../../api/authApi';
import { addNewToastMessage } from '../../redux/actions/toastMessage';
import { authLogin } from '../../redux/actions/auth';
import useValidateForm from '../../hook/useValidateForm';
import styles from './Login.module.css';
function Login() {
    const validates = [
        {
            name: 'email',
            rules: { isRequired: true, isEmail: true },
        },
        {
            name: 'password',
            rules: { isRequired: true },
        },
    ];
    const [isLoading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (isLoading) {
            return;
        }
        setLoading(true);
        const params = new FormData();
        params.append('_email', values.email);
        params.append('_password', values.password);
        const response = await authApi.loginMember(params);
        if (response[0].error === 1) {
            setLoading(false);
            return dispatch(addNewToastMessage('error', 'Đăng nhập thất bại', response[0].message));
        }
        dispatch(
            authLogin({
                user: response[0].user,
                isAuthentication: response[0].auth,
                isAdmin: response[0].admin,
                baseURLImg: response[0].baseURLImg,
            }),
        );
        localStorage.setItem('access_token', JSON.stringify(response[0].access_token));
        localStorage.setItem('refresh_token', JSON.stringify(response[0].refresh_token));
        dispatch(addNewToastMessage('success', 'Đăng nhập thành công', 'Chào mừng bạn'));
        navigate('/', { replace: true });
    };
    const { errors, invalid, removeError, formSubmit } = useValidateForm(validates, handleSubmit);
    const handleChange = (name, value) => {
        setValues({ ...values, [name]: value });
        removeError(name);
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
                <form onSubmit={(e) => formSubmit(e, values)}>
                    <div className={clsx(styles.wrapper)}>
                        <h2 className={clsx(styles.heading)}>Đăng nhập</h2>
                        <div className={clsx(styles.form)}>
                            <div
                                className={clsx(styles.formGroup, {
                                    [styles.invalid]: errors.email,
                                })}
                            >
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Nhập Email ..."
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    onBlur={(e) => invalid('email', e.target.value)}
                                />
                                <span className={clsx(styles.errorMessage)}>{errors.email}</span>
                            </div>
                            <div
                                className={clsx(styles.formGroup, {
                                    [styles.invalid]: errors.password,
                                })}
                            >
                                <label>Mật khẩu</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu ..."
                                    onChange={(e) => handleChange('password', e.target.value)}
                                    onBlur={(e) => invalid('password', e.target.value)}
                                />
                                <span className={clsx(styles.errorMessage)}>{errors.password}</span>
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
