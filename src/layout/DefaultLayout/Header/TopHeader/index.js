import { Link } from 'react-router-dom';
import styles from './TopHeader.module.css';
import clsx from 'clsx';
function TopHeader({ fixed }) {
    return (
        <div className={clsx(styles.wrapper, { [styles.fixed]: fixed })}>
            <div className="container">
                <div className={clsx(styles.topHeader)}>
                    <div className={clsx(styles.social)}>
                        <Link to="" target="_blank" title="MyShop trên Twitter">
                            <i className="fa fa-twitter"></i>
                        </Link>
                        <Link to="" target="_blank" title="MyShop trên Facebook">
                            <i className="fa fa-facebook-square"></i>
                        </Link>
                        <Link to="" target="_blank" title="MyShop trên Instagram">
                            <i className="fa fa-instagram"></i>
                        </Link>
                        <Link to="" target="_blank" title="MyShop trên Youtube">
                            <i className="fa fa-youtube-play"></i>
                        </Link>
                        <span>Theo dõi !</span>
                    </div>
                    <div className={clsx(styles.welcome)}>
                        <span>Chào mừng bạn đến với MyShop</span>
                    </div>
                    <div className={clsx(styles.contact)}>
                        <span>Liên hệ :</span>
                        <Link to="">
                            <i className="fa fa-phone"></i>
                        </Link>
                        <Link to="">
                            <i className="fa fa-envelope-o"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopHeader;
