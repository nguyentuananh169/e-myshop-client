import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const ScrollTop = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    return <></>;
};

export default ScrollTop;
