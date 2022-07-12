import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import useValidateForm from '../../hook/useValidateForm';
import Path from '../../components/Path';
import styles from './Payment.module.css';
import LayoutLeft from './LayoutLeft';
import LayoutRight from './LayoutRight';

function Payment() {
    const validates = [
        {
            name: 'user_name',
            rules: { isRequired: true, minLength: 6, maxLength: 30 },
        },
        {
            name: 'user_email',
            rules: { isRequired: true, isEmail: true },
        },
        {
            name: 'user_phone',
            rules: { isRequired: true, isPhoneNumber: true },
        },
        {
            name: 'user_address',
            rules: { isRequired: true, minLength: 6, maxLength: 100 },
        },
        {
            name: 'city_id',
            rules: { isRequired: true },
        },
        {
            name: 'district_id',
            rules: { isRequired: true },
        },
        {
            name: 'commune_id',
            rules: { isRequired: true },
        },
        {
            name: 'user_note',
            rules: { maxLength: 100 },
        },
    ];
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/thu-tuc-thanh-toan');
    };
    const { errors, removeError, formSubmit, invalid } = useValidateForm(validates, handleSubmit);
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
    if (cart.cartItems.length === 0) {
        return <Navigate to="/" />;
    }
    return (
        <>
            <Path path={path} />
            <div className="container">
                <form className={clsx(styles.wrapper)} onSubmit={(e) => formSubmit(e, cart.user)}>
                    <LayoutLeft
                        user={cart.user}
                        removeError={removeError}
                        invalid={invalid}
                        errors={errors}
                    />
                    <LayoutRight cartItems={cart.cartItems} totalPrice={cart.totalPrice} />
                </form>
            </div>
        </>
    );
}

export default Payment;
