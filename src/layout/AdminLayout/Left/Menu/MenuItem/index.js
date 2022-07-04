import { Link, useLocation, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './MenuItem.module.css';
import { useState } from 'react';
import { useRef } from 'react';
function MenuItem({ item, collapse }) {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);
    const subMenuRef = useRef(null);
    const handleShowDropdownMenu = (e) => {
        if (open) {
            subMenuRef.current.style.height = 0;
        } else {
            const heightBtn = subMenuRef.current.children[0].clientHeight;
            const countChildren = subMenuRef.current.children.length;
            subMenuRef.current.style.height = `${heightBtn * countChildren}px`;
        }
        setOpen(!open);
    };
    if (item.childrens?.length) {
        return (
            <li
                className={clsx(styles.wrapper, styles.dropdownMenu, {
                    [styles.show]: open,
                    [styles.collapse]: collapse,
                })}
            >
                <label className={styles.btn} onClick={handleShowDropdownMenu}>
                    <i className={item.icon}></i>
                    <span>{item.title}</span>
                </label>
                <ul ref={subMenuRef} className={clsx(styles.subMenu, { [styles.show]: open })}>
                    {item.childrens.map((item, index) => (
                        <li
                            key={index}
                            className={clsx({ [styles.active]: pathname === item.path })}
                        >
                            <NavLink
                                to={item.path}
                                className={(nav) =>
                                    clsx(styles.btn, { [styles.active]: nav.isActive })
                                }
                            >
                                <i className={item.icon}></i>
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </li>
        );
    } else {
        return (
            <>
                {item.path ? (
                    <li
                        className={clsx(styles.wrapper, {
                            [styles.collapse]: collapse,
                        })}
                    >
                        <NavLink
                            to={item.path}
                            className={(nav) => clsx(styles.btn, { [styles.active]: nav.isActive })}
                        >
                            <i className={item.icon}></i>
                            <span>{item.title}</span>
                        </NavLink>
                    </li>
                ) : (
                    <li
                        className={clsx(styles.wrapper, styles.title, {
                            [styles.collapse]: collapse,
                        })}
                    >
                        <span>{item.title}</span>
                    </li>
                )}
            </>
        );
    }
}

export default MenuItem;
