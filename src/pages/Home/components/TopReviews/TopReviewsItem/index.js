import clsx from 'clsx';
import styles from './TopReviewsItem.module.css';
import noAvt from '../../../../../assets/img/icon/no-avatar.jpg';
function TopReviewsItem(props) {
    return (
        <div className={clsx(styles.topReviewsItem)} style={{ width: `${props.width}px` }}>
            <div className={clsx(styles.topReviewsItemAvatar)}>
                <img
                    src={
                        props.item.user_avatar
                            ? `${props.item.baseURLImg}${props.item.user_avatar}`
                            : noAvt
                    }
                    alt=""
                />
            </div>
            <div className={clsx(styles.topReviewsItemMain)}>
                <div className={clsx(styles.name)}>
                    <span>{props.item.user_name}</span>
                </div>
                <div className={clsx(styles.reviewsRating)}>
                    <i
                        className={clsx(
                            {
                                [styles.color]: props.item.r_star >= 1,
                            },
                            'fa fa-star',
                        )}
                    ></i>
                    <i
                        className={clsx(
                            {
                                [styles.color]: props.item.r_star >= 2,
                            },
                            'fa fa-star',
                        )}
                    ></i>
                    <i
                        className={clsx(
                            {
                                [styles.color]: props.item.r_star >= 3,
                            },
                            'fa fa-star',
                        )}
                    ></i>
                    <i
                        className={clsx(
                            {
                                [styles.color]: props.item.r_star >= 4,
                            },
                            'fa fa-star',
                        )}
                    ></i>
                    <i
                        className={clsx(
                            {
                                [styles.color]: props.item.r_star >= 5,
                            },
                            'fa fa-star',
                        )}
                    ></i>
                </div>
                <div className={clsx(styles.content)}>
                    <span>{props.item.r_content}</span>
                </div>
                <div className={clsx(styles.time)}>
                    <span>{props.item.r_created_at}</span>
                </div>
            </div>
        </div>
    );
}
export default TopReviewsItem;
