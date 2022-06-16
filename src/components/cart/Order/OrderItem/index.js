import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import styles from './OrderItem.module.css';
function OrderItem(props) {
    return (
        <>
            <tr className={clsx(styles.wrapper)}>
                <td
                    className={clsx(styles.center)}
                    rowSpan={2 + JSON.parse(props.promotion).length}
                >
                    {props.stt}
                </td>
                <td>
                    <img src={props.img} alt="" />
                </td>
                <td className={clsx(styles.center)}>{props.name}</td>
                <td className={clsx(styles.center)}>{props.qty}</td>
                <td className={clsx(styles.center)}>
                    <NumberFormat
                        value={props.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix="&#8363;"
                    />
                </td>
                <td className={clsx(styles.center)}>
                    <NumberFormat
                        value={props.qty * props.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix="&#8363;"
                    />
                </td>
            </tr>
            <tr>
                <td colSpan="5">
                    {JSON.parse(props.attr).map((item, index) => (
                        <span key={item.id}>
                            {index > 0 ? ' / ' : null} {item.value}
                        </span>
                    ))}
                </td>
            </tr>
            {JSON.parse(props.promotion).map((item, index) => (
                <tr className={clsx(styles.border)} key={index}>
                    <td style={{ color: '#888' }} colSpan="5">
                        KM <i>{item}</i>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default OrderItem;
