import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import clsx from 'clsx';
import newsApi from '../../../api/newsApi';
import Path from '../../../components/Path';
import LoadingBox from '../../../components/LoadingBox';
import styles from './NewsDetail.module.css';
import noAvt from '../../../assets/img/icon/no-avatar.jpg';
import NewsRealted from './NewsRelated';
import NewsContent from '../../../components/NewsContent';

function NewsDetail() {
    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [dataNews, setDataNews] = useState({});
    const [newsRelated, setNewsRelated] = useState([]);
    const { cateId, newsId } = useParams();
    useEffect(() => {
        fetchNewsById();
        const updateViews = async () => {
            const params = new FormData();
            params.append('_id', newsId);
            const response = await newsApi.updateViews(params);
        };
        updateViews();
    }, [newsId]);
    useEffect(() => {
        const fetchNewsByCategory = async () => {
            const params = {
                category: cateId,
                limit: 3,
                page: 1,
            };
            setLoading2(true);
            const response = await newsApi.getByCategory(params);
            setNewsRelated(response.dataNews);
            setLoading2(false);
        };
        fetchNewsByCategory();
    }, [cateId]);
    const fetchNewsById = async () => {
        setLoading1(true);
        const response = await newsApi.getById(newsId);
        setLoading1(false);
        setDataNews(response[0]);
    };
    const path = [
        {
            name: 'Tin tức',
            url: '/tin-tuc',
        },
        {
            name: dataNews.cate_name ? dataNews.cate_name : '...',
            url: `/tin-tuc/danh-muc/${cateId}`,
        },
        {
            name: 'Bài viết',
            url: '#',
        },
    ];
    return (
        <>
            <Path path={path} />
            <div className="container">
                <div className={clsx(styles.wrapper)}>
                    <div className={clsx(styles.body)}>
                        {isLoading1 ? (
                            <LoadingBox text="Đang tải bài viết..." />
                        ) : (
                            <NewsContent item={dataNews} />
                        )}
                    </div>
                </div>
                <NewsRealted isLoading={isLoading2} newsRelated={newsRelated} />
            </div>
        </>
    );
}

export default NewsDetail;
