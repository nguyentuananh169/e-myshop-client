import clsx from 'clsx';
import styles from './Subscript.module.css';
function Subscript() {
    return (
        <div className="container">
            <div className={clsx(styles.subscript)}>
                <h3>Đăng ký nhận tin</h3>
                <div className={clsx(styles.text)}>
                    <span>
                        Đăng ký để nhận những tin tức, chương trình khuyến mại
                        hot nhất
                    </span>
                </div>
                <div className={clsx(styles.form)}>
                    <input type="text" placeholder="Nhập tên của bạn ..." />
                    <input type="text" placeholder="Nhập email của bạn ..." />
                    <div className={clsx(styles.checkbox)}>
                        <input type="checkbox" id="check-input" />
                        <label htmlFor="check-input">
                            Luôn cập nhật cho tôi về tin tức và khuyến mại
                        </label>
                    </div>
                    <button type="button" className={clsx(styles.buttonSubmit)}>
                        <i className="fa fa-envelope-o"></i>
                        Đăng ký nhận tin
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Subscript;
