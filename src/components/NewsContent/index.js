import clsx from 'clsx';
import NumberFormat from 'react-number-format';
import styles from './NewsContent.module.css';
import noAvt from '../../assets/img/icon/no-avatar.jpg';
function NewsContent({ item }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.title)}>
                <h4>{item.news_title}</h4>
            </div>
            <div className={clsx(styles.author)}>
                <div className={clsx(styles.txt1)}>
                    <img
                        src={item.user_avatar ? `${item.baseURLImgUser}${item.user_avatar}` : noAvt}
                        alt=""
                    />
                    <span className={clsx(styles.userName)}>{item.user_name}</span>
                </div>
                <div className={clsx(styles.txt2)}>
                    <span className={clsx(styles.time)}>
                        <i className="fa fa-clock-o"></i>
                        {item.news_created_at}
                    </span>
                    <span className={clsx(styles.views)}>
                        <i className="fa fa-eye"></i>
                        <NumberFormat
                            value={item.news_views}
                            displayType={'text'}
                            thousandSeparator={true}
                        />
                    </span>
                </div>
            </div>
            <div className={clsx(styles.summary)}>
                <strong>{item.news_summary}</strong>
            </div>
            <div className={clsx(styles.content)}>
                <div dangerouslySetInnerHTML={{ __html: item.news_content }}></div>
            </div>
        </div>
    );
}

export default NewsContent;
