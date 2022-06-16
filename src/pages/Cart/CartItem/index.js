import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import styles from './CartItem.module.css';
function CartItem(props) {
    return (
        <>
            <tr className={clsx(styles.wrapper)}>
                <td>{props.stt}</td>
                <td>
                    <img src={`${props.img}`} alt="" />
                </td>
                <td>
                    <p className={clsx(styles.name)}>{props.name}</p>
                    {JSON.parse(props.attr).map((item) => (
                        <p key={item.id}>
                            {item.type} : {item.value}
                        </p>
                    ))}
                    {JSON.parse(props.promotion).map((item, index) => (
                        <p key={index} className={clsx(styles.promotion)}>
                            KM <i>{item}</i>
                        </p>
                    ))}
                </td>
                <td>
                    <NumberFormat
                        value={props.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix="&#8363;"
                    />
                </td>
                <td>
                    <div className={clsx(styles.qty)}>
                        <button onClick={() => props.click1(props.qty, props.idProduct, props.id)}>
                            -
                        </button>
                        <input
                            type="text"
                            value={props.qty}
                            onChange={(e) =>
                                props.handleChangeQty(e.target.value, props.idProduct, props.id)
                            }
                        />
                        <button onClick={() => props.click2(props.qty, props.idProduct, props.id)}>
                            +
                        </button>
                    </div>
                </td>
                <td>
                    <NumberFormat
                        value={props.price * props.qty}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix="&#8363;"
                    />
                </td>
                <td className={clsx(styles.remove)}>
                    <button onClick={() => props.handleRemove(props.id)}>
                        <i className="fa fa-times"></i>
                    </button>
                </td>
            </tr>
        </>
    );
}

export default CartItem;
