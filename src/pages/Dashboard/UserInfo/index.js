import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import useValidateForm from '../../../hook/useValidateForm';
import HeaderRight from '../components/HeaderRight';
import ContentRight from '../components/ContentRight';
import Button from '../../../components/Button';
import background from '../../../assets/img/background/icon-account-info.png';
import userApi from '../../../api/userApi';
import LoadingBox from '../../../components/LoadingBox';
import addressApi from '../../../api/addressApi';
import { addNewToastMessage } from '../../../redux/actions/toastMessage';
import { changeInfoUser } from '../../../redux/actions/auth';
import styles from './UserInfo.module.css';
function UserInfo() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        district: '',
        commune: '',
        address: '',
        created_at: '',
        updated_at: '',
        level_name: '',
        password: '',
        new_password: '',
        re_new_password: '',
    });
    let validates = [
        {
            name: 'name',
            rules: { isRequired: true, minLength: 6, maxLength: 30 },
        },
        {
            name: 'email',
            rules: { isRequired: true, isEmail: true },
        },
        {
            name: 'phone',
            rules: { isRequired: true, isPhoneNumber: true },
        },
        {
            name: 'address',
            rules: { isRequired: true, minLength: 6, maxLength: 255 },
        },
        {
            name: 'city',
            rules: { isRequired: true },
        },
        {
            name: 'district',
            rules: { isRequired: true },
        },
        {
            name: 'commune',
            rules: { isRequired: true },
        },
        {
            name: 'new_password',
            rules: { minLength: 6, maxLength: 18 },
        },
        {
            name: 're_new_password',
            rules: { alike: values.new_password },
        },
    ];
    const [isLoading, setLoading] = useState(true);
    const [isSubmit, setSubmit] = useState(false);
    const [listCity, setListCity] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listCommune, setListCommune] = useState([]);
    const dispatch = useDispatch();
    const userSelector = useSelector((state) => state.auth.user);
    useEffect(() => {
        const fetchUser = async () => {
            const response = await userApi.getById();
            setLoading(false);
            if (response[0].error === 0) {
                setValues({
                    name: response[0].user.user_name,
                    email: response[0].user.user_email,
                    phone: response[0].user.user_phone,
                    address: response[0].user.user_address,
                    city: response[0].user.city_id,
                    district: response[0].user.district_id,
                    commune: response[0].user.commune_id,
                    created_at: response[0].user.user_created_at,
                    updated_at: response[0].user.user_updated_at,
                    level_name: response[0].user.user_level_name,
                    password: '',
                    new_password: '',
                    re_new_password: '',
                });
            }
        };
        const fetchCity = async () => {
            const response = await addressApi.getCity();
            setListCity(response);
        };
        fetchUser();
        fetchCity();
    }, []);
    useEffect(() => {
        if (values.city) {
            const fetchDistrict = async () => {
                const response = await addressApi.getDistrictByCityId(values.city);
                setListDistrict(response);
            };
            fetchDistrict();
        }
    }, [values.city]);
    useEffect(() => {
        if (values.district) {
            const fetchCommune = async () => {
                const response = await addressApi.getCommuneByDistrictId(values.district);
                setListCommune(response);
            };
            fetchCommune();
        }
    }, [values.district]);
    const handleSubmit = async () => {
        if (isSubmit) {
            return;
        }
        const params = new FormData();
        params.append('_name', values.name);
        params.append('_email', values.email);
        params.append('_phone', values.phone);
        params.append('_city_id', values.city);
        params.append('_district_id', values.district);
        params.append('_commune_id', values.commune);
        params.append('_address', values.address);
        params.append('_password', values.password);
        params.append('_new_password', values.new_password);
        params.append('_re_new_password', values.re_new_password);
        setSubmit(true);
        const response = await userApi.update(params);
        setSubmit(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(
            changeInfoUser({
                ...userSelector,
                user_name: values.name,
                user_email: values.email,
                user_phone: values.phone,
            }),
        );
        setValues({ ...values, password: '', new_password: '', re_new_password: '' });
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
    };
    const { errors, removeError, formSubmit, invalid } = useValidateForm(validates, handleSubmit);
    const handleChange = (name, value) => {
        setValues({ ...values, [name]: value });
        removeError(name);
    };
    const handleChangeCity = (value) => {
        setValues({ ...values, city: value, district: '', commune: '' });
        removeError('city');
    };
    const handleChangeDistrict = (value) => {
        setValues({ ...values, district: value, commune: '' });
        removeError('district');
    };
    return (
        <>
            <HeaderRight
                title="Thông tin tài khoản"
                text="Kiểm tra và chỉnh sửa thông tin cá nhân của bạn tại đây"
                background={background}
            />
            <ContentRight title="Cập nhật thông tin cá nhân">
                {isLoading ? (
                    <LoadingBox />
                ) : (
                    <form className={clsx(styles.wrapper)} onSubmit={(e) => formSubmit(e, values)}>
                        <div className={clsx(styles.formGroup, { [styles.invalid]: errors.name })}>
                            <label>Họ tên:</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Họ tên..."
                                value={values.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                onBlur={(e) => invalid('name', e.target.value)}
                            />
                            <span className={clsx(styles.errorMessage)}>{errors.name}</span>
                        </div>
                        <div className={clsx(styles.formGroup, { [styles.invalid]: errors.email })}>
                            <label>Email:</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email..."
                                value={values.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                onBlur={(e) => invalid('email', e.target.value)}
                            />
                            <span className={clsx(styles.errorMessage)}>{errors.email}</span>
                        </div>
                        <div className={clsx(styles.formGroup, { [styles.invalid]: errors.phone })}>
                            <label>Số điện thoại:</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Số điện thoại..."
                                value={values.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                onBlur={(e) => invalid('phone', e.target.value)}
                            />
                            <span className={clsx(styles.errorMessage)}>{errors.phone}</span>
                        </div>
                        <div className={clsx(styles.formGroup, { [styles.invalid]: errors.city })}>
                            <label>Tỉnh/Thành phố:</label>
                            <select
                                name="city"
                                value={values.city}
                                onChange={(e) =>
                                    handleChangeCity(
                                        e.target.options[e.target.options.selectedIndex].value,
                                    )
                                }
                                onBlur={(e) =>
                                    invalid(
                                        'city',
                                        e.target.options[e.target.options.selectedIndex].value,
                                    )
                                }
                            >
                                <option value="">--- Tỉnh/Thành phố ---</option>
                                {listCity.map((item) => (
                                    <option key={item.city_id} value={item.city_id}>
                                        {item.city_name}
                                    </option>
                                ))}
                            </select>
                            <span className={clsx(styles.errorMessage)}>{errors.city}</span>
                        </div>
                        <div
                            className={clsx(styles.formGroup, {
                                [styles.invalid]: errors.district,
                            })}
                        >
                            <label>Quận/Huyện:</label>
                            <select
                                name="district"
                                value={values.district}
                                onChange={(e) =>
                                    handleChangeDistrict(
                                        e.target.options[e.target.options.selectedIndex].value,
                                    )
                                }
                                onBlur={(e) =>
                                    invalid(
                                        'district',
                                        e.target.options[e.target.options.selectedIndex].value,
                                    )
                                }
                            >
                                <option value="">--- Quận/Huyện ---</option>
                                {listDistrict.map((item) => (
                                    <option key={item.district_id} value={item.district_id}>
                                        {item.district_name}
                                    </option>
                                ))}
                            </select>
                            <span className={clsx(styles.errorMessage)}>{errors.district}</span>
                        </div>
                        <div
                            className={clsx(styles.formGroup, { [styles.invalid]: errors.commune })}
                        >
                            <label>Xã/Phường:</label>
                            <select
                                name="commune"
                                value={values.commune}
                                onChange={(e) =>
                                    handleChange(
                                        'commune',
                                        e.target.options[e.target.options.selectedIndex].value,
                                    )
                                }
                                onBlur={(e) =>
                                    invalid(
                                        'commune',
                                        e.target.options[e.target.options.selectedIndex].value,
                                    )
                                }
                            >
                                <option value="">--- Xã/Phường ---</option>
                                {listCommune.map((item) => (
                                    <option key={item.commune_id} value={item.commune_id}>
                                        {item.commune_name}
                                    </option>
                                ))}
                            </select>
                            <span className={clsx(styles.errorMessage)}>{errors.commune}</span>
                        </div>
                        <div
                            className={clsx(styles.formGroup, { [styles.invalid]: errors.address })}
                        >
                            <label>Địa chỉ chi tiết:</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Địa chỉ chi tiết..."
                                value={values.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                onBlur={(e) => invalid('address', e.target.value)}
                            />
                            <span className={clsx(styles.errorMessage)}>{errors.address}</span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Ngày tham gia:</label>
                            <input
                                type="text"
                                placeholder="Ngày tham gia..."
                                value={values.created_at}
                                readOnly
                            />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Ngày cập nhật cuối:</label>
                            <input
                                type="text"
                                placeholder="Ngày cập nhật cuối..."
                                value={values.updated_at}
                                readOnly
                            />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Chức vụ:</label>
                            <input
                                type="text"
                                placeholder="Ngày tham gia..."
                                value={values.level_name}
                                readOnly
                            />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label></label>
                            <i className={clsx(styles.note)}>
                                Nhập đủ 3 trường dưới nếu muốn đổi mật khẩu
                            </i>
                        </div>
                        <div
                            className={clsx(styles.formGroup, {
                                [styles.invalid]: errors.password,
                            })}
                        >
                            <label>Mật khẩu cũ:</label>
                            <input
                                type="text"
                                placeholder="Mật khẩu cũ..."
                                name="password"
                                value={values.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                onBlur={(e) => invalid('password', e.target.value)}
                            />
                            <span className={clsx(styles.errorMessage)}>{errors.password}</span>
                        </div>
                        <div
                            className={clsx(styles.formGroup, {
                                [styles.invalid]: errors.new_password,
                            })}
                        >
                            <label>Mật khẩu mới:</label>
                            <input
                                type="text"
                                placeholder="Mật khẩu mới..."
                                name="new_password"
                                value={values.new_password}
                                onChange={(e) => handleChange('new_password', e.target.value)}
                                onBlur={(e) => invalid('new_password', e.target.value)}
                            />
                            <span className={clsx(styles.errorMessage)}>{errors.new_password}</span>
                        </div>
                        <div
                            className={clsx(styles.formGroup, {
                                [styles.invalid]: errors.re_new_password,
                            })}
                        >
                            <label>Nhập lại mật khẩu mới:</label>
                            <input
                                type="text"
                                placeholder="Nhập lại mật khẩu mới..."
                                name="re_new_password"
                                value={values.re_new_password}
                                onChange={(e) => handleChange('re_new_password', e.target.value)}
                                onBlur={(e) => invalid('re_new_password', e.target.value)}
                            />
                            <span className={clsx(styles.errorMessage)}>
                                {errors.re_new_password}
                            </span>
                        </div>

                        <div className={clsx(styles.formGroup)}>
                            <label></label>
                            <Button type="submit" primary loading={isSubmit}>
                                <i className="fa fa-pencil-square-o"></i>
                                Cập nhật
                            </Button>
                        </div>
                    </form>
                )}
            </ContentRight>
        </>
    );
}

export default UserInfo;
