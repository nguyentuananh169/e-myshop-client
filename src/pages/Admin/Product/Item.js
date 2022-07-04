import NumberFormat from 'react-number-format';
import Button from '../../../components/Button';
import { useSliceString } from '../../../hook/useSliceString';
function Item({
    stt,
    item,
    handleViewProduct,
    handleUpdateStatus,
    handleDelete,
    handleShowFormUpdate,
}) {
    return (
        <tr>
            <td>{stt}</td>
            <td>{useSliceString(item.pro_name, 40)}</td>
            <td>
                <img src={`${item.baseURLImg}${item.pro_img}`} alt="" />
            </td>
            <td>
                <ul>
                    {item.pro_sale > 0 && (
                        <li>
                            <strike>
                                Giá:
                                <NumberFormat
                                    value={item.pro_cost}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix="&#8363;"
                                />
                            </strike>
                        </li>
                    )}
                    <li>
                        Giá:
                        <NumberFormat
                            value={item.pro_price}
                            displayType="text"
                            thousandSeparator={true}
                            suffix="&#8363;"
                        />
                    </li>
                    <li>
                        Sale:<span>{item.pro_sale}%</span>
                    </li>
                    {item.pro_qty > 0 ? (
                        <li>
                            <Button success notBtn small>
                                <i className="fa fa-check"></i>Còn hàng
                            </Button>
                        </li>
                    ) : (
                        <li>
                            <Button danger notBtn small>
                                <i className="fa fa-times"></i>Hết hàng
                            </Button>
                        </li>
                    )}
                </ul>
            </td>
            <td>
                <select
                    onChange={(e) =>
                        handleUpdateStatus(
                            item.pro_id,
                            e.target.options[e.target.options.selectedIndex].value,
                        )
                    }
                    value={item.pro_status}
                >
                    <option value="0">Không chọn</option>
                    <option value="1">Mới nhất</option>
                    <option value="2">Nổi bật</option>
                </select>
            </td>
            <td data-type="action">
                <label onClick={() => handleViewProduct(item)}>
                    <i className="fa fa-eye"></i>
                    <span>Xem sản phẩm</span>
                </label>
                <label onClick={() => handleShowFormUpdate(item)}>
                    <i className="fa fa-pencil-square-o"></i>
                    <span>Xửa sản phẩm</span>
                </label>
                <label onClick={() => handleDelete(item.pro_id, item.pro_name)}>
                    <i className="fa fa-times"></i>
                    <span>Xóa sản phẩm</span>
                </label>
            </td>
        </tr>
    );
}

export default Item;
