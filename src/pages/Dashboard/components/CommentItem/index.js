import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './CommentItem.module.css';
import noAvatr from '../../../../assets/img/icon/no-avatar.jpg';
import { useSelector } from 'react-redux';
function CommentItem({ item, type }) {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.avatar)}>
                <img
                    src={user.user_avatar ? `${user.baseURLImg}${user.user_avatar}` : noAvatr}
                    alt=""
                />
            </div>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.name)}>
                    <strong>{item.user_name}</strong>
                </div>
                {type === 'rating' && (
                    <div className={clsx(styles.star)}>
                        {Array(5)
                            .fill(0)
                            .map((elemet, index) => (
                                <i
                                    key={index}
                                    className={clsx('fa fa-star', {
                                        [styles.color]: item.r_star > index,
                                    })}
                                ></i>
                            ))}
                    </div>
                )}
                <div className={clsx(styles.time)}>
                    <i>{item.cmt_created_at || item.r_created_at}</i>
                </div>
                <div className={clsx(styles.content)}>
                    <span>{item.cmt_content || item.r_content}</span>
                </div>
                <div className={clsx(styles.reply)}>
                    <span>
                        {item.reply.length > 0
                            ? `( Đã có ${item.reply.length} câu trả lời )`
                            : '( Chưa có ai trả lời )'}
                    </span>
                </div>
                <div className={clsx(styles.link)}>
                    <span>
                        Bài viết gốc :<Link to={`/product/${item.pro_id}`}>Click vào đây</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
