import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import DropdownMenuAccount from '../DropdownMenuAccount';
import styles from './Tools.module.css';
import Search from '../Search';
function Tools() {
    const [isSearch, setIsSearch] = useState(false);
    const cartLength = useSelector((state) => state.cart.cartItems.length);
    const handleShowSearch = () => {
        setIsSearch(!isSearch);
    };
    return (
        <div className={clsx(styles.tools)}>
            <Search />
            <ul>
                <li>
                    <span>
                        <i className="fa fa-user-circle-o"></i>
                    </span>
                    <div className={clsx(styles.DropdownMenu)}>
                        <DropdownMenuAccount />
                    </div>
                </li>
                <li>
                    <span onClick={handleShowSearch}>
                        <i className="fa fa-search"></i>
                    </span>
                    <Search isSearch={isSearch} handleShowSearch={handleShowSearch} />
                </li>
                <li>
                    <Link to="/gio-hang">
                        <i className="fa fa-shopping-bag"></i>
                        <span className={clsx(styles.countCart)}>{cartLength}</span>
                        {cartLength ? (
                            <span className={clsx(styles.bubble, 'aniBubble')}></span>
                        ) : null}
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Tools;
