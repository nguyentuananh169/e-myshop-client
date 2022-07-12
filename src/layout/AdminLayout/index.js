import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './AdminLayout.module.css';
import Left from './Left';
import Right from './Right';
import { useSelector } from 'react-redux';
function AdminLayout({ children }) {
    const [showMobile, setShowMobile] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const location = useLocation();
    const checkAdmin = useSelector((state) => state.auth);
    useEffect(() => {
        setShowMobile(false);
    }, [location.pathname]);
    if (!checkAdmin.isAdmin || !checkAdmin.isAuthentication) {
        return <Navigate to="/admin/dang-nhap" />;
    }
    const handleSetCollapse = () => {
        setCollapse(!collapse);
    };
    const handleSetShowMenuMobile = () => {
        setShowMobile(!showMobile);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div
                className={clsx('overlay c-pointer', { active: showMobile })}
                onClick={handleSetShowMenuMobile}
            ></div>
            <Left
                showMobile={showMobile}
                collapse={collapse}
                handleSetCollapse={handleSetCollapse}
                handleSetShowMenuMobile={handleSetShowMenuMobile}
            />
            <Right collapse={collapse} handleSetShowMenuMobile={handleSetShowMenuMobile}>
                {children}
            </Right>
        </div>
    );
}

export default AdminLayout;
