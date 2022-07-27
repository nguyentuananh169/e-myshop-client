import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/auth';
import { resertCart } from '../../redux/actions/cart';
import { addNewToastMessage } from '../../redux/actions/toastMessage';
function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const handleLogOut = () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            dispatch(resertCart());
            dispatch(logOut());
            dispatch(addNewToastMessage('success', 'Thành công', 'Bạn đã đăng xuất thành công'));
            navigate('/', { replace: true });
        };
        handleLogOut();
    }, []);
    return <></>;
}

export default Logout;
