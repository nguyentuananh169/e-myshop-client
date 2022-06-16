import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Path from '../../components/Path';
import styles from './Payment.module.css';
import LayoutLeft from './LayoutLeft';
import LayoutRight from './LayoutRight';
import { submitForm } from '../../hook/validationForm';
import { addNewToastMessage } from '../../redux/actions/toastMessage';

function Payment() {
    const validates = [
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
            inputName: 'city_name',
            rules: { required: '' },
        },
        {
            inputName: 'district_name',
            rules: { required: '' },
        },
        {
            inputName: 'commune_name',
            rules: { required: '' },
        },
        {
            inputName: 'user_note',
            rules: { maxLength: 100 },
        },
    ];
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const elements = e.target.elements;
        const messageError = submitForm(elements, validates);
        if (messageError.length > 0) {
            dispatch(
                addNewToastMessage('error', 'Thất bại', 'Bạn cần điền đủ và chính xác thông tin'),
            );
        } else {
            navigate('/thu-tuc-thanh-toan');
        }
    };
    if (cart.cartItems.length === 0) {
        return <Navigate to="/" />;
    }
    const path = [
        {
            name: 'Giỏ hàng',
            url: '/gio-hang',
        },
        {
            name: 'Thanh toán',
            url: '/thanh-toan',
        },
    ];
    return (
        <>
            <Path path={path} />
            <div className="container">
                <form className={clsx(styles.wrapper)} onSubmit={(e) => handleSubmit(e)}>
                    <LayoutLeft user={cart.user} validates={validates} />
                    <LayoutRight cartItems={cart.cartItems} totalPrice={cart.totalPrice} />
                </form>
            </div>
        </>
    );
}

export default Payment;
