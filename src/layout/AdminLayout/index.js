import clsx from 'clsx';
import { useState } from 'react';
import styles from './AdminLayout.module.css';
import Left from './Left';
import Right from './Right';
function AdminLayout({ children }) {
    const [showMobile, setShowMobile] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const handleSetCollapse = () => {
        setCollapse(!collapse);
    };
    const handleSetShowMenuMobile = () => {
        setShowMobile(!showMobile);
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <Left
                showMobile={showMobile}
                collapse={collapse}
                handleSetCollapse={handleSetCollapse}
                handleSetShowMenuMobile={handleSetShowMenuMobile}
            />
            <Right collapse={collapse} handleSetShowMenuMobile={handleSetShowMenuMobile} />
            {/* {children} */}
        </div>
    );
}

export default AdminLayout;
