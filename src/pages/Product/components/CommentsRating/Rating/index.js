import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import ratingApi from '../../../../../api/ratingApi';
import Form from '../components/Form';
import CommentItem from '../../../../../components/CommentItem';
import Pagination from '../../../../../components/Pagination';
import Button from '../../../../../components/Button';
import styles from './Rating.module.css';
import Statistical from './Statistical';
function Rating({ proId, proName, active }) {
    let checkLogin = useSelector((state) => state.auth.isAuthentication);
    const [isLoading, setLoading] = useState(false);
    const [ratingList, setRatingList] = useState([]);
    const [rating, setRating] = useState({});
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        if (proId) {
            fetchRating();
        }
    }, [proId]);
    const fetchRating = async (valuePage = 1, valueLimit = 5) => {
        setLoading(true);
        const params = {
            pro_id: proId,
            page: valuePage,
            limit: valueLimit,
        };
        const response = await ratingApi.show(params);
        setRatingList(response.ratingList);
        setRating({
            star1: response.star1,
            star2: response.star2,
            star3: response.star3,
            star4: response.star4,
            star5: response.star5,
            rating: response.rating,
            totalRating: response.totalRating,
        });
        setPage(response.page);
        setTotalPage(response.totalPage);
        setLoading(false);
    };
    const handleChangePage = (valuePage) => {
        if (valuePage > 0 && valuePage <= totalPage && valuePage !== page) {
            fetchRating(valuePage, 5);
        }
    };
    return (
        <div className={clsx(styles.wrapper, { [styles.active]: active })}>
            <h4 className={clsx(styles.title)}>Đánh giá về {proName} </h4>
            {checkLogin ? (
                <Form type="rating" proId={proId} isLoading={isLoading} fetchRating={fetchRating} />
            ) : (
                <span className={clsx(styles.notLogged)}>
                    Bạn hãy đăng nhập để có thể đánh giá sản phẩm
                </span>
            )}
            <Statistical rating={rating} />
            <div className={clsx(styles.wrapperListRating)}>
                {isLoading && (
                    <>
                        <div className={clsx(styles.loading)}></div>
                        <div className={clsx(styles.textLoading)}>
                            <Button text success loading="Đang tải lại bài đánh giá ..." />
                        </div>
                    </>
                )}
                {ratingList.map((item) => (
                    <CommentItem
                        key={item.r_id}
                        data={item}
                        type="rating"
                        fetchRating={fetchRating}
                    />
                ))}
            </div>
            <Pagination page={page} totalPage={totalPage} handleChangePage={handleChangePage} />
        </div>
    );
}

export default Rating;
