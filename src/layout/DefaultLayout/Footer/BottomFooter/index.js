import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './BottomFooter.module.css';
import visa from '../../../../assets/img/icon/visa.png';
import credit from '../../../../assets/img/icon/credit-card.png';
import paypal from '../../../../assets/img/icon/paypal.png';
import amex from '../../../../assets/img/icon/amex.png';
function BottomFooter() {
    return (
        <>
            <div className={clsx(styles.footerLine)}></div>
            <div className="container">
                <div className={clsx(styles.bottomFooter)}>
                    <span className={clsx(styles.text)}>
                        <span>Copyright © 2021</span>
                    </span>
                    <span className={clsx(styles.icons)}>
                        <Link to="">
                            <img src={visa} alt="" />
                        </Link>
                        <Link to="">
                            <img src={credit} alt="" />
                        </Link>
                        <Link to="">
                            <img src={amex} alt="" />
                        </Link>
                        <Link to="">
                            <img src={paypal} alt="" />
                        </Link>
                    </span>
                </div>
            </div>
        </>
    );
}

export default BottomFooter;
