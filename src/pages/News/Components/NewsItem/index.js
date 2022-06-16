import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useSliceString } from '../../../../hook/useSliceString';
import Button from '../../../../components/Button';
import styles from './NewsItem.module.css';
import noAvt from '../../../../assets/img/icon/no-avatar.jpg';
function NewsItem({ item }) {
    return (
        <div className={clsx(styles.card)}>
            <div className={clsx(styles.body)}>
                <div className={clsx(styles.img)}>
                    <Link to={`/tin-tuc/chi-tiet/${item.cate_id}/${item.news_id}`}>
                        <img src={`${item.baseURLImg}${item.news_img}`} alt="" />
                    </Link>
                </div>
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.title)}>
                        <Link to={`/tin-tuc/chi-tiet/${item.cate_id}/${item.news_id}`}>
                            {useSliceString(item.news_title, 70)}
                        </Link>
                    </div>
                    <div className={clsx(styles.summary)}>
                        <span>{useSliceString(item.news_summary, 120)}</span>
                    </div>
                    <div className={clsx(styles.author)}>
                        <img
                            src={
                                item.user_avatar
                                    ? `${item.baseURLImgUser}${item.user_avatar}`
                                    : noAvt
                            }
                            alt=""
                        />
                        <span className={clsx(styles.name)}>{item.user_name}</span>
                        <span className={clsx(styles.time)}>
                            <i className="fa fa-clock-o"></i>
                            {item.news_created_at}
                        </span>
                    </div>
                    <div className={clsx(styles.category)}>
                        <Button to={`/tin-tuc/danh-muc/${item.cate_id}`} outline dark>
                            {item.cate_name}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsItem;
