import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import TopFooter from './TopFooter';
import BodyFooter from './BodyFooter';
import BottomFooter from './BottomFooter';
import styles from './Footer.module.css';
function Footer() {
    const [scrollTop, setScrollTop] = useState(0);
    const elementRef = useRef(null);
    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrollTop]);
    const handleBackToTop = () => {
        const autoBackToTop = setInterval(() => {
            document.documentElement.scrollTop -= 50;
            if (document.documentElement.scrollTop === 0) {
                clearInterval(autoBackToTop);
            }
        }, 1);
        setScrollTop(0);
    };
    const handleScroll = () => {
        if (document.documentElement.scrollTop > 120) {
            setScrollTop(document.documentElement.scrollTop);
        } else {
            setScrollTop(0);
        }
    };
    return (
        <footer>
            <TopFooter />
            <BodyFooter />
            <BottomFooter />
            <button
                ref={elementRef}
                className={clsx(styles.backToTop)}
                style={{ right: `${scrollTop > 120 ? '20px' : '-70px'}` }}
                onClick={handleBackToTop}
            >
                <i className="fa fa-arrow-up"></i>
            </button>
        </footer>
    );
}

export default Footer;
