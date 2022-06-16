import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import newsApi from '../../../../api/newsApi';
import BlogItem from './BlogItem';
import Loading from './BlogItem/Loading';
import TitleBox from '../../../../components/TitleBox';
import styles from './BlogList.module.css';
function BlogList() {
    const [isLoading, setLoading] = useState(true);
    const [newsList, setNewsList] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            const params = {
                page: 1,
                limit: 3,
            };
            const response = await newsApi.getByStatus(params);
            setNewsList(response.dataNews);
            setLoading(false);
        };
        fetchNews();
    }, []);
    return (
        <div className="container">
            <TitleBox title="Tin tức - Sự kiện" />
            <div className={clsx(styles.blogList)}>
                {isLoading ? (
                    <Loading count={3} />
                ) : (
                    newsList.map((item) => <BlogItem key={item.news_id} item={item} />)
                )}
            </div>
        </div>
    );
}

export default BlogList;
