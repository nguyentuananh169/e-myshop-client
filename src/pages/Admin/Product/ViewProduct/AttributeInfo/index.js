import clsx from 'clsx';
import styles from './AttributeInfo.module.css';
function AttributeInfo({ proAttr }) {
    let attribute = JSON.parse(proAttr);
    return (
        <div className={clsx(styles.wrapper)}>
            <h4 className={clsx(styles.title)}>Thuộc tính sản phẩm</h4>
            <table>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>kiểu</th>
                        <th>Giá trị</th>
                    </tr>
                    {attribute.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.type}</td>
                            <td>{item.value.join(' -- ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AttributeInfo;
