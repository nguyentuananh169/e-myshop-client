import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './MenuItem.module.css';
function MenuItem({ item }) {
    const [isShow, setShow] = useState(false);
    if (item.userName) {
        return (
            <li className={clsx(styles.wrapper)}>
                <div className={clsx(styles.user, styles.btn)} onClick={() => setShow(!isShow)}>
                    <div className={clsx(styles.name)}>
                        <strong>{item.userName}</strong>
                        <p>{item.level}</p>
                    </div>
                    <div className={clsx(styles.avatar)}>
                        <img src={item.userAvatar} alt="" />
                    </div>
                </div>
                {item.childrens?.length && (
                    <ul className={clsx(styles.subMenu, { [styles.show]: isShow })}>
                        {item.childrens.map((item, index) => (
                            <li key={index}>
                                <Link to={item.to}>
                                    <i className={item.icon}></i>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        );
    } else {
        return (
            <li className={clsx(styles.wrapper)}>
                <label className={clsx(styles.text, styles.btn)} onClick={() => setShow(!isShow)}>
                    {item.to ? (
                        <Link to={item.to}>{item.title}</Link>
                    ) : (
                        <i className={item.icon}></i>
                    )}
                    {item.notification && (
                        <span className={clsx(styles.notification)}>{item.notification}</span>
                    )}
                </label>
                {item.childrens?.length && (
                    <ul className={clsx(styles.subMenu, { [styles.show]: isShow })}>
                        {item.childrens.map((item, index) => (
                            <li key={index}>
                                <Link to={item.to}>
                                    <i className={item.icon}></i>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        );
    }
}

export default MenuItem;
