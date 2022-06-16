import clsx from 'clsx';
import styles from './Pagination.module.css';
function Pagination(props) {
    let liElements = Array(props.totalPage).fill(0);
    return (
        <div className={clsx(styles.wrapper)}>
            {props.totalPage > 0 ? (
                <ul>
                    <li
                        className={clsx({ [styles.disabled]: props.page <= 1 })}
                        onClick={() => props.handleChangePage(props.page - 1)}
                    >
                        <button>&#60;</button>
                    </li>
                    {liElements.map((item, index) => (
                        <li
                            key={index}
                            className={clsx({ [styles.active]: props.page === index + 1 })}
                        >
                            <button onClick={() => props.handleChangePage(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li
                        className={clsx({ [styles.disabled]: props.page >= props.totalPage })}
                        onClick={() => props.handleChangePage(props.page + 1)}
                    >
                        <button>&#62;</button>
                    </li>
                </ul>
            ) : (
                ''
            )}
        </div>
    );
}

export default Pagination;
