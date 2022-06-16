import { Link } from 'react-router-dom';
import clsx from 'clsx';
import LoadingBox from '../../../../components/LoadingBox';
import styles from './NewsRelated.module.css';
function NewsRealted({ isLoading, newsRelated }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.heading)}>
                <h4>Bài viết liên quan</h4>
            </div>
            <div className={clsx(styles.content)}>
                {isLoading ? (
                    <LoadingBox text="Đang tải bài viết liên quan..." />
                ) : (
                    newsRelated.map((item) => (
                        <div key={item.news_id} className={clsx(styles.item)}>
                            <div className={clsx(styles.img)}>
                                <Link to={`/tin-tuc/chi-tiet/${item.cate_id}/${item.news_id}`}>
                                    <img src={`${item.baseURLImg}/${item.news_img}`} alt="" />
                                </Link>
                            </div>
                            <div className={clsx(styles.info)}>
                                <div className={clsx(styles.title)}>
                                    <Link to={`/tin-tuc/chi-tiet/${item.cate_id}/${item.news_id}`}>
                                        {item.news_title}
                                    </Link>
                                </div>
                                <div className={clsx(styles.author)}>
                                    <span>{item.user_name}</span>
                                    <Link to={`/tin-tuc/danh-muc/${item.cate_id}`}>
                                        {item.cate_name}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default NewsRealted;
