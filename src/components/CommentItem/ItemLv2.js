import clsx from 'clsx';
import useTime from '../../hook/useTime';
import styles from './CommentItem.module.css';
import noAvatar from '../../assets/img/icon/no-avatar.jpg';
function ItemLv2({ item }) {
    return (
        <div className={clsx(styles.container, styles.lv2)}>
            <div className={clsx(styles.avatar)}>
                <img
                    src={item.user_avatar ? `${item.baseURLImg}${item.user_avatar}` : noAvatar}
                    alt=""
                />
            </div>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.name)}>
                    <strong>{item.user_name}</strong>
                    {item.user_level > 1 ? (
                        <span>
                            <i className="fa fa-check-circle"></i>
                            {item.user_level === '2' && 'Kiểm duyệt viên'}
                            {item.user_level === '3' && 'Quản trị viên'}
                        </span>
                    ) : null}
                </div>
                <div className={clsx(styles.time)}>
                    <span>{useTime(item.cmt_created_at || item.r_created_at)}</span>
                </div>
                <div className={clsx(styles.content)}>
                    <span>{item.cmt_content || item.r_content}</span>
                </div>
            </div>
        </div>
    );
}

export default ItemLv2;
