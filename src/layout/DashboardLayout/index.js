import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import TopHeader from '../DefaultLayout/Header/TopHeader';
import Left from './Left';
import Right from './Right';
function DashboardLayout({ children }) {
    const [isShowMenu, setShowMenu] = useState(false);
    const isAuthentication = useSelector((state) => state.auth.isAuthentication);
    const handleSetShowMenu = (boolean) => {
        if (typeof boolean === 'boolean') {
            setShowMenu(boolean);
        } else {
            setShowMenu(!isShowMenu);
        }
    };
    if (!isAuthentication) {
        return <Navigate to={`/dang-nhap`} replace />;
    }
    return (
        <div className="container">
            <TopHeader fixed />
            <Left isShowMenu={isShowMenu} handleSetShowMenu={handleSetShowMenu} />
            <Right handleSetShowMenu={handleSetShowMenu}>{children}</Right>
        </div>
    );
}
export default DashboardLayout;
