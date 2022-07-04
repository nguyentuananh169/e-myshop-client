import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Path.module.css';
function Path(props) {
    return (
        <div className={clsx(styles.wrapperPath, { [styles.adminPath]: props.adminPath })}>
            <div className={clsx('container', styles.path)}>
                <ul className={clsx(styles.pathList)}>
                    <li>
                        {props.adminPath ? (
                            <Link to="/admin">
                                <i className="fa fa-home"></i>Trang chủ
                            </Link>
                        ) : (
                            <Link to="/">
                                <i className="fa fa-home"></i>Trang chủ
                            </Link>
                        )}
                    </li>
                    {props.path?.map((item, index) => (
                        <li key={index}>
                            <Link to={item.url}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Path;
