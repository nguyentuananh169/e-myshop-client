import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import styles from './ProductItem.module.css';
function ProductItem({ item }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.img)}>
                <Link to={`/product/${item.pro_id}`}>
                    <img src={`${item.baseURLImg}${item.pro_img}`} alt="" />
                </Link>
            </div>
            <div className={clsx(styles.content)}>
                <div className={clsx(styles.name)}>
                    <Link to={`/product/${item.pro_id}`}>{item.pro_name}</Link>
                </div>
                <div className={clsx(styles.price)}>
                    <span>
                        <NumberFormat
                            value={item.pro_price}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix="&#8363;"
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
