import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Logo from './Logo';
import Tools from './Tools';
import Menu from './Menu';
import styles from './NavHeader.module.css';
import { useLocation } from 'react-router-dom';
function NavHeader() {
    const [isFixed, setFixed] = useState(false);
    const [isShowMenuMoible, setShowMenuMoible] = useState(false);
    const location = useLocation();
    useEffect(() => {
        window.addEventListener('scroll', handleScrool);
        return () => {
            window.removeEventListener('scroll', handleScrool);
        };
    }, []);
    useEffect(() => {
        setShowMenuMoible(false);
    }, [location.pathname]);
    const handleScrool = () => {
        if (document.documentElement.scrollTop > 120) {
            setFixed(true);
        } else {
            setFixed(false);
        }
    };
    const handleShowMenuMoible = () => {
        setShowMenuMoible(!isShowMenuMoible);
    };
    return (
        <div className={clsx(styles.wrapper, { [styles.fixed]: isFixed })}>
            <div className="container">
                <div className={clsx(styles.navContent)}>
                    <div className={clsx(styles.iconBars)} onClick={handleShowMenuMoible}>
                        <i className="fa fa-bars"></i>
                    </div>
                    <Logo />
                    <Menu mobile={isShowMenuMoible} handleShowMenuMoible={handleShowMenuMoible} />
                    <Tools />
                </div>
            </div>
        </div>
    );
}

export default NavHeader;
