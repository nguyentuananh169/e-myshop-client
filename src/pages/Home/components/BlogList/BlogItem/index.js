import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './BlogItem.module.css';
import noAvt from '../../../../../assets/img/icon/no-avatar.jpg';
function BlogItem(props) {
    return (
        <div className={clsx(styles.blogItem)}>
            <div className={clsx(styles.blogItemImg)}>
                <Link to={`tin-tuc/chi-tiet/${props.item.cate_id}/${props.item.news_id}`}>
                    <img src={`${props.item.baseURLImg}${props.item.news_img}`} alt="" />
                </Link>
                <Link
                    className={clsx(styles.category)}
                    to={`/tin-tuc/danh-muc/${props.item.cate_id}`}
                >
                    {props.item.cate_name}
                </Link>
            </div>
            <div className={clsx(styles.blogItemTitle)}>
                <Link to={`tin-tuc/chi-tiet/${props.item.cate_id}/${props.item.news_id}`}>
                    {`${props.item.news_title}`}
                </Link>
            </div>
            <div className={clsx(styles.blogItemAuthor)}>
                <div className={clsx(styles.author)}>
                    <img
                        src={
                            props.item.user_avatar
                                ? `${props.item.baseURLImgUser}${props.item.user_avatar}`
                                : noAvt
                        }
                        alt=""
                    />
                    <span className="text-success">{props.item.user_name}</span>
                </div>
                <div className={clsx(styles.time)}>
                    <i className="fa fa-clock-o"></i>
                    <span>{props.item.news_created_at}</span>
                </div>
            </div>
            <div className={clsx(styles.blogItemLine)}></div>
            <div className={clsx(styles.blogItemSummary)}>
                <span>{props.item.news_summary}</span>
            </div>
        </div>
    );
}
export default BlogItem;
