import clsx from 'clsx';
import styles from './Status.module.css';
function Status({ user }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <strong>3. Trạng thái đơn hàng</strong>
            <div className={clsx(styles.table, 'custom-scrollbars')}>
                <table className="border">
                    <tbody>
                        <tr className="border">
                            <th>#</th>
                            <th>Trạng thái</th>
                            <th>Người gửi</th>
                            <th>Ghi chú</th>
                            <th>Thời gian</th>
                        </tr>
                        <tr className="border">
                            <td>1</td>
                            <td>Gửi yêu cầu đặt hàng</td>
                            <td>{user.user_name}</td>
                            <td>{user.user_note}</td>
                            <td>{user.created_at}</td>
                        </tr>
                        <tr className="border">
                            <td>2</td>
                            <td>{user.status_id > 1 ? user.status_name : 'Chưa tiếp nhận'}</td>
                            <td>QTV MyShop</td>
                            <td>{user.order_admin_note}</td>
                            <td>{user.updated_at}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Status;
