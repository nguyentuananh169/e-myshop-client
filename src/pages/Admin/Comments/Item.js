import { Link } from 'react-router-dom';
import clsx from 'clsx';
import useSliceString from '../../../hook/useSliceString';
import Button from '../../../components/Button';
import noAvt from '../../../assets/img/icon/no-avatar.jpg';
import styles from './Comments.module.css';
function Item({ stt, item, handleSetDataComments }) {
    return (
        <tr>
            <td>{stt}</td>
            <td>
                <div className={clsx(styles.infoCmt)}>
                    <div className={clsx(styles.avt)}>
                        <img
                            style={{ objectFit: 'cover' }}
                            src={item.user_avatar ? `${item.baseURLImg}${item.user_avatar}` : noAvt}
                            alt=""
                        />
                    </div>
                    <div className={clsx(styles.info)}>
                        <div>
                            <strong>{item.user_name}</strong>
                        </div>
                        <div className={clsx(styles.mgt)}>
                            <i>{item.cmt_created_at}</i>
                        </div>
                        <div className={clsx(styles.mgt)}>
                            <span>{useSliceString(item.cmt_content, 50)}</span>
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
            <td data-type="action">
                <label onClick={() => handleSetDataComments(item)}>
                    <i className="fa fa-pencil-square-o"></i>
                    <span>Xem và bình luận</span>
                </label>
            </td>
        </tr>
    );
}

export default Item;
