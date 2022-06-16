import clsx from 'clsx';
import styles from './WarrantyPolicy.module.css';
import share from '../../../../assets/img/icon/share.png';
import truck from '../../../../assets/img/icon/truck.png';
import guaranteed from '../../../../assets/img/icon/guaranteed.png';
import like from '../../../../assets/img/icon/like.png';
function WarrantyPolicy() {
    return (
        <div className="container">
            <div className={clsx(styles.warrantyPolicy)}>
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.icon)}>
                        <img src={truck} alt="" />
                    </div>
                    <div className={clsx(styles.title)}>
                        <span>Giao hàng trên toàn thế giới</span>
                    </div>
                    <div className={clsx(styles.content)}>
                        <span>
                            Vận chuyển trong 7 ngày ở mọi nơi trên thế giới!
                        </span>
                    </div>
                </div>
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.icon)}>
                        <img src={guaranteed} alt="" />
                    </div>
                    <div className={clsx(styles.title)}>
                        <span>Đảm bảo sự hài lòng</span>
                    </div>
                    <div className={clsx(styles.content)}>
                        <span>
                            Chúng tôi đảm bảo sản phẩm chính hãng, chất lượng
                            tốt.
                        </span>
                    </div>
                </div>
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.icon)}>
                        <img src={share} alt="" />
                    </div>
                    <div className={clsx(styles.title)}>
                        <span>Trả hàng trong 30 ngày</span>
                    </div>
                    <div className={clsx(styles.content)}>
                        <span>
                            Miễn phí đổi trả trong 30 ngày đầu sử dụng sản phẩm
                        </span>
                    </div>
                </div>
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.icon)}>
                        <img src={like} alt="" />
                    </div>
                    <div className={clsx(styles.title)}>
                        <span>Hỗ trợ khách hàng 24/7</span>
                    </div>
                    <div className={clsx(styles.content)}>
                        <span>
                            Hỗ trợ khách hàng trên mọi phương tiện truyền thông
                            xã hội khác!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WarrantyPolicy;
