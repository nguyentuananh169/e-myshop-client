import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import useValidateForm from '../../hook/useValidateForm';
import authApi from '../../api/authApi';
import { addNewToastMessage } from '../../redux/actions/toastMessage';
import { authLogin } from '../../redux/actions/auth';
import styles from './LoginAdmin.module.css';
import Button from '../../components/Button';
function LoginAdmin() {
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        if (isLoading) {
            return;
        }
        const params = new FormData();
        params.append('_email', values.email);
        params.append('_password', values.password);
        setLoading(true);
        const response = await authApi.loginAdmin(params);
        setLoading(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
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
        dispatch(addNewToastMessage('success', 'Thành công', 'Chào mừng bạn quay trở lại'));
        navigate('/admin', { replace: true });
    };
    const { errors, removeError, formSubmit, invalid } = useValidateForm(validates, handleSubmit);
    const handleChange = (name, value) => {
        setValues({ ...values, [name]: value });
        removeError(name);
    };
    const checkLogin = useSelector((state) => state.auth);
    if (checkLogin.isAuthentication && checkLogin.isAdmin) {
        return <Navigate to="/admin" replace />;
    }
    return (
        <div className={clsx(styles.loginPage)}>
            <form onSubmit={(e) => formSubmit(e, values)}>
                <div className={clsx(styles.wrapperForm)}>
                    <h3 className={clsx(styles.heading)}>Trang đăng nhập</h3>
                    <div className={clsx(styles.formGroup)}>
                        <input
                            type="text"
                            name="email"
                            placeholder="Nhập email..."
                            onChange={(e) => handleChange('email', e.target.value)}
                            onBlur={(e) => invalid('email', e.target.value)}
                        />
                        <label className={clsx(styles.icon)}>
                            <i className="fa fa-user"></i>
                        </label>
                        {errors.email && (
                            <span className={clsx(styles.messagesError)}>{errors.email}</span>
                        )}
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu..."
                            onChange={(e) => handleChange('password', e.target.value)}
                            onBlur={(e) => invalid('password', e.target.value)}
                        />
                        <label className={clsx(styles.icon)}>
                            <i className="fa fa-unlock-alt"></i>
                        </label>
                        {errors.password && (
                            <span className={clsx(styles.messagesError)}>{errors.password}</span>
                        )}
                    </div>
                    <div className={clsx(styles.tools)}>
                        <div className={clsx(styles.rememberMe)}>
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Ghi nhớ</label>
                        </div>
                        <div className={clsx(styles.forgotPassword)}>
                            <Link to="#">Quên mật khẩu ?</Link>
                        </div>
                    </div>
                    <div className={clsx(styles.submit)}>
                        <Button loading={isLoading}>Đăng nhập</Button>
                    </div>
                    {/* <button className={clsx(styles.submit)}>Đăng nhập</button> */}
                </div>
            </form>
        </div>
    );
}

export default LoginAdmin;
