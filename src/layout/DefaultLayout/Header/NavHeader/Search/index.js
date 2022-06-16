import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { addNewToastMessage } from '../../../../../redux/actions/toastMessage';
import styles from './Search.module.css';
const Search = ({ isSearch, handleShowSearch }) => {
    const [keyword, setKeyword] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (isSearch) {
            inputRef.current.focus();
        }
    }, [isSearch]);
    const handleChangeKeyword = (value) => {
        setKeyword(value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            handleShowSearch();
            navigate(`/tim-kiem/${keyword}`);
        } else {
            dispatch(addNewToastMessage('error', 'Thất bại', 'Bạn chưa nhập từ khóa tìm kiếm'));
        }
    };
    return (
        <>
            <div className={clsx(styles.searchBox, { [styles.show]: isSearch })}>
                <div className={clsx(styles.main)}>
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Nhập từ khóa tìm kiếm..."
                            value={keyword}
                            onChange={(e) => handleChangeKeyword(e.target.value)}
                        />
                        <button type="submit">
                            <i className="fa fa-search"></i>
                        </button>
                    </form>
                </div>
                <div className={clsx(styles.close)}>
                    <button type="button" onClick={handleShowSearch}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            </div>
            {isSearch && (
                <div className={clsx(styles.overlaySearch)} onClick={handleShowSearch}></div>
            )}
        </>
    );
};

export default Search;
