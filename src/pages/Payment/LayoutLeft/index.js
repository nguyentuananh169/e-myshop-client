import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import userApi from '../../../api/userApi';
import { infoUserCart } from '../../../redux/actions/cart';
import addressApi from '../../../api/addressApi';
import LoadingBox from '../../../components/LoadingBox';
import { invalidInput } from '../../../hook/validationForm';
import styles from './LayoutLeft.module.css';
function LayoutLeft({ user, validates }) {
    const [cityList, setCityList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [communeList, setCommuneList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchInfoUser = async () => {
            const response = await userApi.getById();
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
            setLoading(false);
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
            fetchDistrict();
        }
    }, [user.city_id]);
    useEffect(() => {
        if (user.district_id) {
            fetchCommune();
        }
    }, [user.district_id]);
    const fetchDistrict = async () => {
        const response = await addressApi.getDistrictByCityId(user.city_id);
        setDistrictList(response);
    };
    const fetchCommune = async () => {
        const response = await addressApi.getCommuneByDistrictId(user.district_id);
        setCommuneList(response);
    };
    const handleChangeCity = (element) => {
        const infoUser = user;
        infoUser.city_id = element.value;
        infoUser.city_name = element.innerText;
        infoUser.district_id = '';
        infoUser.commune_id = '';
        dispatch(infoUserCart(infoUser));
    };
    const handleChangeDistrict = (element) => {
        const infoUser = user;
        infoUser.district_id = element.value;
        infoUser.district_name = element.innerText;
        infoUser.commune_id = '';
        dispatch(infoUserCart(infoUser));
    };
    const handleChangeCommune = (element) => {
        const infoUser = user;
        infoUser.commune_id = element.value;
        infoUser.commune_name = element.innerText;
        dispatch(infoUserCart(infoUser));
    };
    const handleChange = (element) => {
        const infoUser = { ...user };
        infoUser[element.name] = element.value;
        dispatch(infoUserCart(infoUser));
        const formGroupElement = element.parentElement;
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
    return (
        <div className={clsx(styles.wrapper)}>
            <h4 className={clsx(styles.heading)}>Địa chỉ thanh toán</h4>
            {isLoading ? (
                <LoadingBox />
            ) : (
                <>
                    <div className={clsx(styles.formGroup)}>
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Họ và Tên"
                            value={user.user_name}
                            onChange={(e) => handleChange(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                        />
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <input
                            type="text"
                            name="user_email"
                            placeholder="Email"
                            value={user.user_email}
                            onChange={(e) => handleChange(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                        />
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <input
                            type="text"
                            name="user_phone"
                            placeholder="Số điện thọai"
                            value={user.user_phone}
                            onChange={(e) => handleChange(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                        />
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <select
                            value={user.city_id}
                            name="city_name"
                            onChange={(e) =>
                                handleChangeCity(e.target.options[e.target.options.selectedIndex])
                            }
                            onBlur={(e) => handleBlur(e.target)}
                        >
                            <option value="">Tỉnh / Thành phố</option>
                            {cityList.map((item) => (
                                <option key={item.city_id} value={item.city_id}>
                                    {item.city_name}
                                </option>
                            ))}
                        </select>
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <select
                            value={user.district_id}
                            name="district_name"
                            onChange={(e) =>
                                handleChangeDistrict(
                                    e.target.options[e.target.options.selectedIndex],
                                )
                            }
                            onBlur={(e) => handleBlur(e.target)}
                        >
                            <option value="">Quận / Huyện</option>
                            {districtList.map((item) => (
                                <option key={item.district_id} value={item.district_id}>
                                    {item.district_name}
                                </option>
                            ))}
                        </select>
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <select
                            value={user.commune_id}
                            name="commune_name"
                            onChange={(e) =>
                                handleChangeCommune(
                                    e.target.options[e.target.options.selectedIndex],
                                )
                            }
                            onBlur={(e) => handleBlur(e.target)}
                        >
                            <option value="">Xã / Phường</option>
                            {communeList.map((item) => (
                                <option key={item.commune_id} value={item.commune_id}>
                                    {item.commune_name}
                                </option>
                            ))}
                        </select>
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <input
                            type="text"
                            name="user_address"
                            placeholder="Địa chỉ chi tiết: Số 20, ngõ 90"
                            value={user.user_address}
                            onChange={(e) => handleChange(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                        />
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                    <div className={clsx(styles.formGroup, styles.textarea)}>
                        <textarea
                            placeholder="Ghi chú (nếu cần). Tối đa 100 ký tự"
                            name="user_note"
                            value={user.user_note}
                            onChange={(e) => handleChange(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                        ></textarea>
                        <span className={clsx('message', styles.errorMessage)}></span>
                    </div>
                </>
            )}
        </div>
    );
}

export default LayoutLeft;
