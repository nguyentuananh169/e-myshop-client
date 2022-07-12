import { Link } from 'react-router-dom';
import clsx from 'clsx';
import useSliceString from '../../../hook/useSliceString';
import Button from '../../../components/Button';
import noAvt from '../../../assets/img/icon/no-avatar.jpg';
import styles from './Rating.module.css';
function Item({ stt, item, isChangeStatus, handleSetDataRating, handleChangeStatus }) {
    return (
        <tr>
            <td>{stt}</td>
            <td>
                <div className={clsx(styles.infoCmt)}>
                    <div className={clsx(styles.avt)}>
                        <img
                            src={item.user_avatar ? `${item.baseURLImg}${item.user_avatar}` : noAvt}
                            alt=""
                        />
                    </div>
                    <div className={clsx(styles.info)}>
                        <div>
                            <strong>{item.user_name}</strong>
                        </div>
                        <div className={clsx(styles.star, styles.mgt)}>
                            {Array(5)
                                .fill(0)
                                .map((i, index) => (
                                    <i
                                        key={index}
                                        className={clsx('fa fa-star', {
                                            [styles.color]: index < item.r_star,
                                        })}
                                    ></i>
                                ))}
                        </div>
                        <div className={clsx(styles.mgt)}>
                            <i>{item.r_created_at}</i>
                        </div>
                        <div className={clsx(styles.mgt)}>
                            <span>{useSliceString(item.r_content, 50)}</span>
                        </div>
                        <div className={clsx(styles.mgt)}>
                            <span>
                                {item.reply.length
                                    ? `( Đã có ${item.reply.length} câu trả lời )`
                                    : '( Chưa có câu trả lời nào )'}
                            </span>
                        </div>
                        <div className={clsx(styles.link, styles.mgt)}>
                            <Link to={`/product/${item.pro_id}`}>Bài viết gốc: click vào đây</Link>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                {item.admin_reply ? (
                    <Button notBtn success>
                        <i className="fa fa-check-square-o"></i>
                        Đã trả lời
                    </Button>
                ) : (
                    <Button notBtn dark>
                        <i className="fa fa-info-circle"></i>
                        Chưa trả lời
                    </Button>
                )}
            </td>
            <td>
                {item.r_status === '0' ? (
                    <Button
                        dark
                        loading={isChangeStatus}
                        onClick={() => handleChangeStatus(item.r_id)}
                    >
                        <i className="fa fa-ban"></i>
                        Không
                    </Button>
                ) : (
                    <Button
                        success
                        loading={isChangeStatus}
                        onClick={() => handleChangeStatus(item.r_id)}
                    >
                        <i className="fa fa-check-square-o"></i>
                        Có
                    </Button>
                )}
            </td>
            <td data-type="action">
                <label onClick={() => handleSetDataRating(item)}>
                    <i className="fa fa-pencil-square-o"></i>
                    <span>Xem và bình luận</span>
                </label>
            </td>
        </tr>
    );
}

export default Item;
