import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import categoryNewsApi from '../../../../../api/categoryNewsApi';
import styles from './DropdownMenuBlog.module.css';
const DropdownMenuBlog = ({ active, mobile }) => {
    const [catgoryList, setCatgoryList] = useState([]);
    const elementRef = useRef(null);
    useEffect(() => {
        const fetchCategory = async () => {
            const response = await categoryNewsApi.getAll();
            if (response.dataCate && response.dataCate.length > 0) {
                setCatgoryList(response.dataCate);
            }
        };
        fetchCategory();
    }, []);
    return (
        <div
            ref={elementRef}
            className={clsx(styles.dropdownMenuBlog, {
                [styles.active]: active,
            })}
            style={
                mobile
                    ? {
                          height: active
                              ? `${elementRef.current.scrollHeight}px`
                              : 0,
                      }
                    : {}
            }
        >
            <ul>
                {catgoryList.map((item) => (
                    <li key={item.id}>
                        <Link to={`/tin-tuc/danh-muc/${item.id}`}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DropdownMenuBlog;
