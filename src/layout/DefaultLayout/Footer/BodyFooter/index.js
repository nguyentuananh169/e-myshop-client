import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './BodyFooter.module.css';
function BodyFooter() {
    return (
        <>
            <div className="container">
                <div className={clsx(styles.bodyFooter)}>
                    <div className={clsx(styles.bodyFooterItem1)}>
                        <p>MyShop là Website bán hàng online</p>
                        <Link to="">
                            <i className="fa fa-envelope-o"></i>mail
                            myshop@myshop.com
                        </Link>
                    </div>
                    <div className={clsx(styles.bodyFooterItem2)}>
                        <ul>
                            <span>Hỗ trợ - Dịch vụ</span>
                            <li>
                                <Link to="">Mua hàng trả góp</Link>
                            </li>
                            <li>
                                <Link to="">Chính sách bảo hành</Link>
                            </li>
                            <li>
                                <Link to="">Câu hỏi thường gặp</Link>
                            </li>
                            <li>
                                <Link to="">Tra cứu đơn hàng</Link>
                            </li>
                            <li>
                                <Link to="">Chính sách bảo mật</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={clsx(styles.bodyFooterItem3)}>
                        <h3>Đăng ký nhận tin</h3>
                        <div className={clsx(styles.text)}>
                            <span>
                                Đăng ký để nhận những tin tức, chương trình
                                khuyến mại hot nhất
                            </span>
                        </div>
                        <div className={clsx(styles.form)}>
                            <input
                                type="text"
                                placeholder="Nhập tên của bạn ..."
                            />
                            <input
                                type="text"
                                placeholder="Nhập email của bạn ..."
                            />
                            <div className={clsx(styles.checkbox)}>
                                <input type="checkbox" id="check-input-2" />
                                <label htmlFor="check-input-2">
                                    Luôn cập nhật cho tôi về tin tức và khuyến
                                    mại
                                </label>
                            </div>
                            <button
                                type="button"
                                className={clsx(styles.buttonSubmit)}
                            >
                                <i className="fa fa-envelope-o"></i>
                                Đăng ký nhận tin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-line"></div>
        </>
    );
}

export default BodyFooter;
