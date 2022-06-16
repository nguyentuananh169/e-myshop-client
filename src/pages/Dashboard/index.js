import HeaderRight from './components/HeaderRight';
import bg from '../../assets/img/background/icon-account-home.png';
function Dashboard() {
    return (
        <HeaderRight
            title="Bảng điều khiển"
            text="Tổng quát các hoạt động của bạn tại đây"
            background={bg}
        />
    );
}

export default Dashboard;
