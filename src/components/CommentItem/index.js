import { useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import useTime from '../../hook/useTime';
import Button from '../Button';
import styles from './CommentItem.module.css';
import noAvatar from '../../assets/img/icon/no-avatar.jpg';
import Form from '../../pages/Product/components/CommentsRating/components/Form';
import ItemLv2 from './ItemLv2';
function CommentItem({ data, isLoading, fetchComments, type = 'comment', fetchRating }) {
    const [isShowForm, setShowForm] = useState(false);
    let levelElement1;
    switch (data.user_level) {
        case '2':
            levelElement1 = 'Kiểm duyệt viên';
            break;
        case '3':
            levelElement1 = 'Quản trị viên';
            break;
        default:
            break;
    }
    let checkLogin = useSelector((state) => state.auth.isAuthentication);
    const handleShowFormLv2 = () => {
        setShowForm(!isShowForm);
    };
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.avatar)}>
                <img
                    src={data.user_avatar ? `${data.baseURLImg}${data.user_avatar}` : noAvatar}
                    alt=""
                />
            </div>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.name)}>
                    <strong>{data.user_name}</strong>
                    {levelElement1 ? (
                        <span>
                            <i className="fa fa-check-circle"></i>
                            {levelElement1}
                        </span>
                    ) : null}
                </div>
                {data.r_star && (
                    <div className={clsx(styles.star)}>
                        <i className={clsx({ [styles.color]: 1 <= data.r_star }, 'fa fa-star')}></i>
                        <i className={clsx({ [styles.color]: 2 <= data.r_star }, 'fa fa-star')}></i>
                        <i className={clsx({ [styles.color]: 3 <= data.r_star }, 'fa fa-star')}></i>
                        <i className={clsx({ [styles.color]: 4 <= data.r_star }, 'fa fa-star')}></i>
                        <i className={clsx({ [styles.color]: 5 <= data.r_star }, 'fa fa-star')}></i>
                    </div>
                )}
                <div className={clsx(styles.time)}>
                    <span>{useTime(data.cmt_created_at || data.r_created_at)}</span>
                </div>
                <div className={clsx(styles.content)}>
                    <span>{data.cmt_content || data.r_content}</span>
                </div>
                {checkLogin && (
                    <Button
                        small
                        outline
                        primary
                        onClick={() => setShowForm(!isShowForm)}
                        active={isShowForm}
                    >
                        {isShowForm ? (
                            <>
                                <i className="fa fa-close"></i>Đóng
                            </>
                        ) : (
                            <>
                                <i className="fa fa-comment-o"></i>Bình luận
                            </>
                        )}
                    </Button>
                )}

                {/*  */}

                {isShowForm ? (
                    <Form
                        proId={data.pro_id}
                        isLoading={isLoading}
                        type={type}
                        parentComment={data.cmt_id || data.r_id}
                        fetchComments={fetchComments}
                        fetchRating={fetchRating}
                        handleShowFormLv2={handleShowFormLv2}
                    />
                ) : (
                    data.reply.map((item) => <ItemLv2 key={item.cmt_id || item.r_id} item={item} />)
                )}
            </div>
        </div>
    );
}

export default CommentItem;
