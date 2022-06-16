import clsx from 'clsx';
import styles from './User.module.css';
function User({ user }) {
    return (
        <>
            <div className={clsx(styles.wrapper)}>
                <h3>1. Thông tin người đặt hàng</h3>
                <div className={clsx(styles.table, 'custom-scrollbars')}>
                    <table cellPadding="0" cellSpacing="0">
                        <tbody>
                            <tr>
                                <td className={clsx(styles.label)}>Họ tên</td>
                                <td>{user.user_name}</td>
                                <td className={clsx(styles.label)}>Điện thọai</td>
                                <td>{user.user_phone}</td>
                                <td className={clsx(styles.label)}>Email</td>
                                <td>{user.user_email}</td>
                            </tr>
                            <tr>
                                <td className={clsx(styles.label)}>Phương thức thanh toán</td>
                                <td>Thanh toán khi nhận hàng</td>
                                <td className={clsx(styles.label)}>Vận chuyển</td>
                                <td>Miễn phí vận chuyển</td>
                            </tr>
                            <tr>
                                <td className={clsx(styles.label)}>Thành phố / Tỉnh</td>
                                <td>{user.city_name}</td>
                                <td className={clsx(styles.label)}>Quận / Huyện</td>
                                <td>{user.district_name}</td>
                                <td className={clsx(styles.label)}>Xã / Phường</td>
                                <td>{user.commune_name}</td>
                            </tr>
                            <tr>
                                <td className={clsx(styles.label)}>Địa chỉ chi tiết</td>
                                <td colSpan={5}>{user.user_address}</td>
                            </tr>
                            <tr>
                                <td className={clsx(styles.label)}>Ghi chú đặt hàng</td>
                                <td colSpan={5}>{user.user_note}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default User;
