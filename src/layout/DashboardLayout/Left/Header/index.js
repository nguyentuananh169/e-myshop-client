import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import userApi from '../../../../api/userApi';
import { addNewToastMessage } from '../../../../redux/actions/toastMessage';
import { changeInfoUser } from '../../../../redux/actions/auth';
import styles from './Header.module.css';
import noAvatar from '../../../../assets/img/icon/no-avatar.jpg';
import logo from '../../../../assets/img/icon/logo-web.png';
function Header() {
    const [isLoading, setLoading] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const handleChangeAvatar = async (file) => {
        if (isLoading) {
            return dispatch(
                addNewToastMessage(
                    'warning',
                    'Chưa được xử lý',
                    'Lần thay đổi trước chưa có kết quả. Vui lòng đợi',
                    5000,
                ),
            );
        }
        if (
            file &&
            file.type !== 'image/png' &&
            file.type !== 'image/jpeg' &&
            file.type !== 'image/gif'
        ) {
            return dispatch(
                addNewToastMessage(
                    'error',
                    'Thất bại',
                    'Avatar bạn nhập không đúng định dạng (PNG, JPEG, GIF)',
                ),
            );
        }
        setLoading(true);
        const params = new FormData();
        params.append('_avatar', file);
        const response = await userApi.changeAvatar(params);
        setLoading(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(
            changeInfoUser({
                ...user,
                user_avatar: response[0].avatar,
                baseURLImg: response[0].baseURLImg,
            }),
        );
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.logo)}>
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.avatar)}>
                    <img
                        src={user?.user_avatar ? `${user.baseURLImg}${user.user_avatar}` : noAvatar}
                        alt=""
                    />
                </div>
                <div className={clsx(styles.text)}>
                    <strong className={clsx(styles.name)}>{user.user_name}</strong>
                    <label htmlFor="change-avatar">
                        <i className="fa fa-file-image-o"></i>
                        Thay đổi ảnh đại diện
                    </label>
                    <input
                        type="file"
                        id="change-avatar"
                        onChange={(e) => handleChangeAvatar(e.target.files[0])}
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
