import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Main.module.css';
function Main({ handleSetShowMenu }) {
    const location = useLocation();
    useEffect(() => {
        handleSetShowMenu(false);
    }, [location.pathname]);
    return (
        <div className={clsx(styles.wrapper, 'custom-scrollbars')}>
            <ul>
                <li className={clsx(styles.home)}>
                    <Link to="/">
                        <i className="fa fa-home"></i>
                        Trang chủ
                    </Link>
                </li>
                <li className={clsx({ [styles.active]: location.pathname === '/bang-dieu-khien' })}>
                    <Link to="/bang-dieu-khien">
                        <i className="fa fa-tachometer"></i>
                        Bảng điều khiển
                    </Link>
                </li>
                <li
                    className={clsx({
                        [styles.active]: location.pathname === '/bang-dieu-khien/thong-tin',
                    })}
                >
                    <Link to="/bang-dieu-khien/thong-tin">
                        <i className="fa fa-user-circle-o"></i>
                        Thông tin tài khoản
                    </Link>
                </li>
                <li
                    className={clsx({
                        [styles.active]: location.pathname === '/bang-dieu-khien/don-hang',
                    })}
                >
                    <Link to="/bang-dieu-khien/don-hang">
                        <i className="fa fa-shopping-basket"></i>
                        Đơn hàng của bạn
                    </Link>
                </li>
                <li
                    className={clsx({
                        [styles.active]:
                            location.pathname === '/bang-dieu-khien/san-pham-yeu-thich',
                    })}
                >
                    <Link to="/bang-dieu-khien/san-pham-yeu-thich">
                        <i className="fa fa-heart-o"></i>
                        Sản phẩm yêu thích
                    </Link>
                </li>
                <li
                    className={clsx({
                        [styles.active]: location.pathname === '/bang-dieu-khien/quan-ly-binh-luan',
                    })}
                >
                    <Link to="/bang-dieu-khien/quan-ly-binh-luan">
                        <i className="fa fa-newspaper-o"></i>
                        Quản lý bình luận
                    </Link>
                </li>
                <li
                    className={clsx({
                        [styles.active]: location.pathname === '/bang-dieu-khien/quan-ly-danh-gia',
                    })}
                >
                    <Link to="/bang-dieu-khien/quan-ly-danh-gia">
                        <i className="fa fa-pencil-square-o"></i>
                        Quản lý đánh giá
                    </Link>
                </li>
                <li className={clsx({ [styles.active]: location.pathname === '/dang-xuat' })}>
                    <Link to="/dang-xuat">
                        <i className="fa fa-sign-out"></i>
                        Đăng xuất
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Main;
