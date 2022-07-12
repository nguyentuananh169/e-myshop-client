import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import userApi from '../../../api/userApi';
import { infoUserCart } from '../../../redux/actions/cart';
import addressApi from '../../../api/addressApi';
import LoadingBox from '../../../components/LoadingBox';
import styles from './LayoutLeft.module.css';
function LayoutLeft({ user, invalid, removeError, errors }) {
    const [cityList, setCityList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [communeList, setCommuneList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchInfoUser = async () => {
            const response = await userApi.getById();
            setLoading(false);
            if (response[0].error === 0) {
                dispatch(
                    infoUserCart({
                        user_id: response[0].user.user_id,
                        user_name: response[0].user.user_name,
                        user_email: response[0].user.user_email,
                        user_phone: response[0].user.user_phone,
                        user_address: response[0].user.user_address,
                        city_id: response[0].user.city_id,
                        city_name: response[0].user.city_name,
                        district_id: response[0].user.district_id,
                        district_name: response[0].user.district_name,
                        commune_id: response[0].user.commune_id,
                        commune_name: response[0].user.commune_name,
                        user_note: '',
                    }),
                );
            }
        };
        const fetchCity = async () => {
            const response = await addressApi.getCity();
            setCityList(response);
        };
        fetchInfoUser();
        fetchCity();
    }, []);
    useEffect(() => {
        if (user.city_id) {
            const fetchDistrict = async () => {
                const response = await addressApi.getDistrictByCityId(user.city_id);
                setDistrictList(response);
            };
            fetchDistrict();
        }
    }, [user.city_id]);
    useEffect(() => {
        if (user.district_id) {
            const fetchCommune = async () => {
                const response = await addressApi.getCommuneByDistrictId(user.district_id);
                setCommuneList(response);
            };
            fetchCommune();
        }
    }, [user.district_id]);

    const handleChangeCity = (element) => {
        const infoUser = user;
        infoUser.city_id = element.value;
        infoUser.city_name = element.innerText;
        infoUser.district_id = '';
        infoUser.commune_id = '';
        dispatch(infoUserCart(infoUser));
        removeError('city_id');
    };
    const handleChangeDistrict = (element) => {
        const infoUser = user;
        infoUser.district_id = element.value;
        infoUser.district_name = element.innerText;
        infoUser.commune_id = '';
        dispatch(infoUserCart(infoUser));
        removeError('district_id');
    };
    const handleChangeCommune = (element) => {
        const infoUser = user;
        infoUser.commune_id = element.value;
        infoUser.commune_name = element.innerText;
        dispatch(infoUserCart(infoUser));
        removeError('commune_id');
    };
    const handleChange = (name, value) => {
        dispatch(infoUserCart({ ...user, [name]: value }));
        removeError(name);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <h4 className={clsx(styles.heading)}>Địa chỉ thanh toán</h4>
            {isLoading ? (
                <LoadingBox />
            ) : (
                <>
                    <div className={clsx(styles.formGroup, { [styles.invalid]: errors.user_name })}>
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Họ và Tên"
                            value={user.user_name}
                            onChange={(e) => handleChange('user_name', e.target.value)}
                            onBlur={(e) => invalid('user_name', e.target.value)}
                        />
                        <span className={clsx('message', styles.errorMessage)}>
                            {errors.user_name}
                        </span>
                    </div>
                    <div
                        className={clsx(styles.formGroup, { [styles.invalid]: errors.user_email })}
                    >
                        <input
                            type="text"
                            name="user_email"
                            placeholder="Email"
                            value={user.user_email}
                            onChange={(e) => handleChange('user_email', e.target.value)}
                            onBlur={(e) => invalid('user_email', e.target.value)}
                        />
                        <span className={clsx('message', styles.errorMessage)}>
                            {errors.user_email}
                        </span>
                    </div>
                    <div
                        className={clsx(styles.formGroup, { [styles.invalid]: errors.user_phone })}
                    >
                        <input
                            type="text"
                            name="user_phone"
                            placeholder="Số điện thọai"
                            value={user.user_phone}
                            onChange={(e) => handleChange('user_phone', e.target.value)}
                            onBlur={(e) => invalid('user_phone', e.target.value)}
                        />
                        <span className={clsx('message', styles.errorMessage)}>
                            {errors.user_phone}
                        </span>
                    </div>
                    <div className={clsx(styles.formGroup, { [styles.invalid]: errors.city_id })}>
                        <select
                            value={user.city_id}
                            name="city_name"
                            onChange={(e) =>
                                handleChangeCity(e.target.options[e.target.options.selectedIndex])
                            }
                            onBlur={(e) =>
                                invalid(
                                    'city_id',
                                    e.target.options[e.target.options.selectedIndex].value,
                                )
                            }
                        >
                            <option value="">Tỉnh / Thành phố</option>
                            {cityList.map((item) => (
                                <option key={item.city_id} value={item.city_id}>
                                    {item.city_name}
                                </option>
                            ))}
                        </select>
                        <span className={clsx('message', styles.errorMessage)}>
                            {errors.city_id}
                        </span>
                    </div>
                    <div
                        className={clsx(styles.formGroup, { [styles.invalid]: errors.district_id })}
                    >
                        <select
                            value={user.district_id}
                            name="district_name"
                            onChange={(e) =>
                                handleChangeDistrict(
                                    e.target.options[e.target.options.selectedIndex],
                                )
                            }
                            onBlur={(e) =>
                                invalid(
                                    'district_id',
                                    e.target.options[e.target.options.selectedIndex].value,
                                )
                            }
                        >
                            <option value="">Quận / Huyện</option>
                            {districtList.map((item) => (
                                <option key={item.district_id} value={item.district_id}>
                                    {item.district_name}
                                </option>
                            ))}
                        </select>
                        <span className={clsx('message', styles.errorMessage)}>
                            {errors.district_id}
                        </span>
                    </div>
                    <div
                        className={clsx(styles.formGroup, { [styles.invalid]: errors.commune_id })}
                    >
                        <select
                            value={user.commune_id}
                            name="commune_name"
                            onChange={(e) =>
                                handleChangeCommune(
                                    e.target.options[e.target.options.selectedIndex],
                                )
                            }
                            onBlur={(e) =>
                                invalid(
                                    'commune_id',
                                    e.target.options[e.target.options.selectedIndex].value,
                                )
                            }
                        >
                            <option value="">Xã / Phường</option>
                            {communeList.map((item) => (
                                <option key={item.commune_id} value={item.commune_id}>
                                    {item.commune_name}
                                </option>
                            ))}
                        </select>
                        <span className={clsx('message', styles.errorMessage)}>
                            {errors.commune_id}
                        </span>
                    </div>
                    <div
                        className={clsx(styles.formGroup, {
                            [styles.invalid]: errors.user_address,
                        })}
                    >
                        <input
                            type="text"
                            name="user_address"
                            placeholder="Địa chỉ chi tiết: Số 20, ngõ 90"
                            value={user.user_address}
                            onChange={(e) => handleChange('user_address', e.target.value)}
                            onBlur={(e) => invalid('user_address', e.target.value)}
                        />
                        <span className={clsx('message', styles.errorMessage)}>
                            {errors.user_address}
                        </span>
                    </div>
                    <div
                        className={clsx(styles.formGroup, styles.textarea, {
                            [styles.invalid]: errors.user_note,
                        })}
                    >
                        <textarea
                            placeholder="Ghi chú (nếu cần). Tối đa 100 ký tự"
                            name="user_note"
                            value={user.user_note}
                            onChange={(e) => handleChange('user_note', e.target.value)}
                            onBlur={(e) => invalid('user_note', e.target.value)}
                        ></textarea>
                        <span className={clsx('message', styles.errorMessage)}>
                            {errors.user_note}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}

export default LayoutLeft;
