import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Error404.module.css';
const Error404 = () => {
    const navigate = useNavigate();
    return (
        <div className={clsx(styles.notfound)}>
            <button className={clsx(styles.goBack)} onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-left"></i>Quay lại
            </button>
            <div className={clsx(styles.error404)}>
                <div className={clsx(styles.text)}>
                    <strong>404</strong>
                    <span>Trang không tồn tại</span>
                </div>
            </div>
            <Link to="/">Quay về trang chủ</Link>
        </div>
    );
};

export default Error404;
