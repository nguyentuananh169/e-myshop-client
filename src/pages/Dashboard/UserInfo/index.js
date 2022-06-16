import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import HeaderRight from '../components/HeaderRight';
import ContentRight from '../components/ContentRight';
import Button from '../../../components/Button';
import { invalidInput, submitForm } from '../../../hook/validationForm';
import background from '../../../assets/img/background/icon-account-info.png';
import userApi from '../../../api/userApi';
import LoadingBox from '../../../components/LoadingBox';
import addressApi from '../../../api/addressApi';
import { addNewToastMessage } from '../../../redux/actions/toastMessage';
import { changeInfoUser } from '../../../redux/actions/auth';
import styles from './UserInfo.module.css';
function UserInfo() {
    const [user, setUser] = useState({
        user_password: '',
        user_new_password: '',
        user_re_new_password: '',
    });
    let validates = [
        {
            inputName: 'user_name',
            rules: { required: '', minLength: 6, maxLength: 30 },
        },
        {
            inputName: 'user_email',
            rules: { required: '', email: '' },
        },
        {
            inputName: 'user_phone',
            rules: { required: '', phoneNumber: 6 },
        },
        {
            inputName: 'user_address',
            rules: { required: '', minLength: 6, maxLength: 255 },
        },
        {
            inputName: 'city_id',
            rules: { required: '' },
        },
        {
            inputName: 'district_id',
            rules: { required: '' },
        },
        {
            inputName: 'commune_id',
            rules: { required: '' },
        },
        {
            inputName: 'user_new_password',
            rules: { minLength: 6, maxLength: 18 },
        },
        {
            inputName: 'user_re_new_password',
            rules: { rePassword: user.user_new_password },
        },
    ];
    const [listCity, setListCity] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listCommune, setListCommune] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isSubmit, setSubmit] = useState(false);
    const dispatch = useDispatch();
    const userSelector = useSelector((state) => state.auth.user);
    useEffect(() => {
        const fetchUser = async () => {
            const response = await userApi.getById();
            if (response[0].error === 0) {
                setUser(response[0].user);
                setUser({
                    ...user,
                    user_name: response[0].user.user_name,
                    user_email: response[0].user.user_email,
                    user_phone: response[0].user.user_phone,
                    user_address: response[0].user.user_address,
                    city_id: response[0].user.city_id,
                    district_id: response[0].user.district_id,
                    commune_id: response[0].user.commune_id,
                    user_created_at: response[0].user.user_created_at,
                    user_updated_at: response[0].user.user_updated_at,
                    user_level_name: response[0].user.user_level_name,
                });
            }
            setLoading(false);
        };
        const fetchCity = async () => {
            const response = await addressApi.getCity();
            setListCity(response);
        };
        fetchUser();
        fetchCity();
    }, []);
    useEffect(() => {
        if (user.city_id) {
            const fetchDistrict = async () => {
                const response = await addressApi.getDistrictByCityId(user.city_id);
                setListDistrict(response);
            };
            fetchDistrict();
        }
    }, [user.city_id]);
    useEffect(() => {
        if (user.district_id) {
            const fetchCommune = async () => {
                const response = await addressApi.getCommuneByDistrictId(user.district_id);
                setListCommune(response);
            };
            fetchCommune();
        }
    }, [user.district_id]);
    const handleChangeCityId = (value) => {
        setUser({ ...user, city_id: value, district_id: '', commune_id: '' });
    };
    const handleChangeDistrictId = (value) => {
        setUser({ ...user, district_id: value, commune_id: '' });
    };
    const handleChangeCommuneId = (value) => {
        setUser({ ...user, commune_id: value });
    };
    const handleChange = (element) => {
        const formGroupElement = element.parentElement;
        setUser({ ...user, [element.name]: element.value });
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
        if (isSubmit) {
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
            setSubmit(true);
            const params = new FormData();
            params.append('_name', user.user_name);
            params.append('_email', user.user_email);
            params.append('_phone', user.user_phone);
            params.append('_city_id', user.city_id);
            params.append('_district_id', user.district_id);
            params.append('_commune_id', user.commune_id);
            params.append('_address', user.user_address);
            params.append('_password', user.user_password);
            params.append('_new_password', user.user_new_password);
            params.append('_re_new_password', user.user_re_new_password);
            const response = await userApi.update(params);
            if (response[0].error === 1) {
                setSubmit(false);
                return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
            }
            setSubmit(false);
            setUser({
                ...user,
                user_password: '',
                user_new_password: '',
                user_re_new_password: '',
            });
            dispatch(
                changeInfoUser({
                    ...userSelector,
                    user_name: user.user_name,
                    user_email: user.user_email,
                    user_phone: user.user_phone,
                }),
            );
            dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
        }
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
                    <form className={clsx(styles.wrapper)} onSubmit={handleSubmit}>
                        <div className={clsx(styles.formGroup)}>
                            <label>Họ tên:</label>
                            <input
                                type="text"
                                name="user_name"
                                placeholder="Họ tên*"
                                value={user?.user_name}
                                onChange={(e) => handleChange(e.target)}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            <span className={clsx('message', styles.errorMessage)}></span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Email:</label>
                            <input
                                type="text"
                                name="user_email"
                                placeholder="Email*"
                                value={user?.user_email}
                                onChange={(e) => handleChange(e.target)}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            <span className={clsx('message', styles.errorMessage)}></span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Số điện thoại:</label>
                            <input
                                type="text"
                                name="user_phone"
                                placeholder="Số điện thoại*"
                                value={user?.user_phone}
                                onChange={(e) => handleChange(e.target)}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            <span className={clsx('message', styles.errorMessage)}></span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Tỉnh/Thành phố:</label>
                            <select
                                name="city_id"
                                value={user?.city_id}
                                onChange={(e) =>
                                    handleChangeCityId(
                                        e.target.options[e.target.options.selectedIndex].value,
                                    )
                                }
                                onBlur={(e) => handleBlur(e.target)}
                            >
                                <option value="">--- Tỉnh/Thành phố ---</option>
                                {listCity.map((item) => (
                                    <option key={item.city_id} value={item.city_id}>
                                        {item.city_name}
                                    </option>
                                ))}
                            </select>
                            <span className={clsx('message', styles.errorMessage)}></span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Quận/Huyện:</label>
                            <select
                                name="district_id"
                                value={user?.district_id}
                                onChange={(e) =>
                                    handleChangeDistrictId(
                                        e.target.options[e.target.options.selectedIndex].value,
                                    )
                                }
                                onBlur={(e) => handleBlur(e.target)}
                            >
                                <option value="">--- Quận/Huyện ---</option>
                                {listDistrict.map((item) => (
                                    <option key={item.district_id} value={item.district_id}>
                                        {item.district_name}
                                    </option>
                                ))}
                            </select>
                            <span className={clsx('message', styles.errorMessage)}></span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Xã/Phường:</label>
                            <select
                                name="commune_id"
                                value={user?.commune_id}
                                onChange={(e) =>
                                    handleChangeCommuneId(
                                        e.target.options[e.target.options.selectedIndex].value,
                                    )
                                }
                                onBlur={(e) => handleBlur(e.target)}
                            >
                                <option value="">--- Xã/Phường ---</option>
                                {listCommune.map((item) => (
                                    <option key={item.commune_id} value={item.commune_id}>
                                        {item.commune_name}
                                    </option>
                                ))}
                            </select>
                            <span className={clsx('message', styles.errorMessage)}></span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Địa chỉ chi tiết:</label>
                            <input
                                type="text"
                                name="user_address"
                                placeholder="Địa chỉ chi tiết*"
                                value={user?.user_address}
                                onChange={(e) => handleChange(e.target)}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            <span className={clsx('message', styles.errorMessage)}></span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Ngày tham gia:</label>
                            <input
                                type="text"
                                placeholder="Ngày tham gia"
                                defaultValue={user?.user_created_at}
                                readOnly
                            />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Ngày cập nhật cuối:</label>
                            <input
                                type="text"
                                placeholder="Ngày cập nhật cuối"
                                defaultValue={user?.user_updated_at}
                                readOnly
                            />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Chức vụ:</label>
                            <input
                                type="text"
                                placeholder="Ngày tham gia"
                                defaultValue={user?.user_level_name}
                                readOnly
                            />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label></label>
                            <i className={clsx(styles.note)}>
                                Để trống nếu không muốn đổi mật khẩu
                            </i>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Mật khẩu cũ:</label>
                            <input
                                type="text"
                                placeholder="Mật khẩu cũ"
                                name="user_password"
                                value={user.user_password}
                                onChange={(e) =>
                                    setUser({ ...user, user_password: e.target.value })
                                }
                            />
                            <span className={clsx('message', styles.errorMessage)}></span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Mật khẩu mới:</label>
                            <input
                                type="text"
                                placeholder="Mật khẩu mới"
                                name="user_new_password"
                                value={user.user_new_password}
                                onChange={(e) => handleChange(e.target)}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            <span className={clsx('message', styles.errorMessage)}></span>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Nhập lại mật khẩu mới:</label>
                            <input
                                type="text"
                                placeholder="Nhập lại mật khẩu mới"
                                name="user_re_new_password"
                                value={user.user_re_new_password}
                                onChange={(e) => handleChange(e.target)}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            <span className={clsx('message', styles.errorMessage)}></span>
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
