import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import addressApi from '../../api/addressApi';
import userApi from '../../api/userApi';
import Path from '../../components/Path';
import { addNewToastMessage } from '../../redux/actions/toastMessage';
import { invalidInput, submitForm } from '../../hook/validationForm';
import styles from './Register.module.css';
import Button from '../../components/Button';
const Register = () => {
    const validates = [
        {
            inputName: 'name',
            rules: { required: '', minLength: 6, maxLength: 30 },
        },
        {
            inputName: 'email',
            rules: { required: '', email: '' },
        },
        {
            inputName: 'password',
            rules: { required: '', minLength: 6, maxLength: 30 },
        },
        {
            inputName: 'phone',
            rules: { required: '', phoneNumber: 6 },
        },
        {
            inputName: 'address',
            rules: { required: '', minLength: 6, maxLength: 255 },
        },
        {
            inputName: 'city',
            rules: { required: '' },
        },
        {
            inputName: 'district',
            rules: { required: '' },
        },
        {
            inputName: 'commune',
            rules: { required: '' },
        },
    ];
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        commune: '',
    });
    const [cityList, setCityList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [communeList, setCommuneList] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchCity = async () => {
        const response = await addressApi.getCity();
        setCityList(response);
    };
    const fetchDistrict = async () => {
        const response = await addressApi.getDistrictByCityId(values.city);
        setDistrictList(response);
    };
    const fetchCommune = async () => {
        const response = await addressApi.getCommuneByDistrictId(values.district);
        setCommuneList(response);
    };
    const handleChangeCityId = (value) => {
        setValues({ ...values, city: value, district: '', commune: '' });
    };
    const handleChangeDistrictId = (value) => {
        setValues({ ...values, district: value, commune: '' });
    };
    const handleChangeCommuneId = (value) => {
        setValues({ ...values, commune: value });
    };
    const handleChange = (element) => {
        const formGroupElement = element.parentElement;
        setValues({ ...values, [element.name]: element.value });
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
        } else {
            formGroupElement.classList.remove(clsx(styles.invalid));
            formGroupElement.querySelector('.message').innerText = '';
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
                formGroupElement.querySelector('.message').innerText = messageError[i].message;
            }
        } else {
            setLoading(true);
            const params = new FormData();
            params.append('_name', values.name);
            params.append('_email', values.email);
            params.append('_password', values.password);
            params.append('_phone', values.phone);
            params.append('_address', values.address);
            params.append('_city_id', values.city);
            params.append('_district_id', values.district);
            params.append('_commune_id', values.commune);
            const response = await userApi.add(params);
            if (response[0].error === 1) {
                setLoading(false);
                return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
            }
            dispatch(
                addNewToastMessage('success', 'Thành công', 'Đăng ký thành công mời bạn đăng nhập'),
            );
            navigate('/dang-nhap');
        }
    };
    useEffect(() => {
        fetchCity();
    }, []);
    useEffect(() => {
        if (values.city) {
            fetchDistrict();
        }
    }, [values.city]);
    useEffect(() => {
        if (values.district) {
            fetchCommune();
        }
    }, [values.district]);
    const checkLogin = useSelector((state) => state.auth.isAuthentication);
    if (checkLogin) {
        return <Navigate to="/" />;
    }
    const path = [
        {
            name: 'Đăng ký',
            url: '#',
        },
    ];
    return (
        <>
            <Path path={path} />
            <div className="container">
                <form className={clsx(styles.formRegister)} onSubmit={handleSubmit}>
                    <h2 className={clsx(styles.heading)}>Đăng ký tài khoản</h2>
                    <div className={clsx(styles.formGroup)}>
                        <label>Họ và tên: </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nhập họ và tên"
                            value={values.name}
                            onChange={(e) => handleChange(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                        />
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Email: </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Nhập email"
                            value={values.email}
                            onChange={(e) => handleChange(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                        />
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup, styles.posRelative)}>
                        <label>Mật khẩu: </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={values.password}
                            onChange={(e) => handleChange(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                        />
                        <i
                            className={`${showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} eye`}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Số điện thọai: </label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Nhập số điện thọai"
                            value={values.phone}
                            onChange={(e) => handleChange(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                        />
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Địa chỉ chi tiết: </label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Nhập địa chỉ chi tiết"
                            value={values.address}
                            onChange={(e) => handleChange(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                        />
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Tỉnh / Thành phố</label>
                        <select
                            name="city"
                            onChange={(e) =>
                                handleChangeCityId(
                                    e.target.options[e.target.options.selectedIndex].value,
                                )
                            }
                            onBlur={(e) => handleBlur(e.target)}
                        >
                            <option value="">---Chọn tỉnh / thành phố---</option>
                            {cityList.map((item) => (
                                <option key={item.city_id} value={item.city_id}>
                                    {item.city_name}
                                </option>
                            ))}
                        </select>
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Quận / Huyện</label>
                        <select
                            name="district"
                            onChange={(e) =>
                                handleChangeDistrictId(
                                    e.target.options[e.target.options.selectedIndex].value,
                                )
                            }
                            onBlur={(e) => handleBlur(e.target)}
                        >
                            <option value="">---Chọn quận / huyện---</option>
                            {districtList.map((item) => (
                                <option key={item.district_id} value={item.district_id}>
                                    {item.district_name}
                                </option>
                            ))}
                        </select>
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Xã / Phường / Thị trấn</label>
                        <select
                            name="commune"
                            value={values.commune}
                            onChange={(e) =>
                                handleChangeCommuneId(
                                    e.target.options[e.target.options.selectedIndex].value,
                                )
                            }
                            onBlur={(e) => handleBlur(e.target)}
                        >
                            <option value="">---Chọn xã / phường / thị trấn---</option>
                            {communeList.map((item) => (
                                <option key={item.commune_id} value={item.commune_id}>
                                    {item.commune_name}
                                </option>
                            ))}
                        </select>
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <Button loading={isLoading && 'Đang đăng ký ...'} fullWidth primary>
                            <i className="fa fa-user-plus"></i>
                            Đăng ký
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
