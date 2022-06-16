import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './TopFooter.module.css';
function TopFooter() {
    return (
        <>
            <div className="container">
                <div className={clsx(styles.topFooter)}>
                    <span className={clsx(styles.text)}>
                        Theo dõi chúng tôi !
                    </span>
                    <span className={clsx(styles.icons)}>
                        <Link to="">
                            <i className="fa fa-twitter"></i>
                        </Link>
                        <Link to="">
                            <i className="fa fa-facebook-official"></i>
                        </Link>
                        <Link to="">
                            <i className="fa fa-instagram"></i>
                        </Link>
                        <Link to="">
                            <i className="fa fa-youtube-play"></i>
                        </Link>
                    </span>
                </div>
            </div>
            <div className={clsx(styles.footerLine)}></div>
        </>
    );
}

export default TopFooter;
