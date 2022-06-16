import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import commentsApi from '../../../../../api/commentsApi';
import Form from '../components/Form';
import CommentItem from '../../../../../components/CommentItem';
import styles from './Comments.module.css';
import Pagination from '../../../../../components/Pagination';
import Button from '../../../../../components/Button';
import { useSelector } from 'react-redux';
function Comments({ proId, proName, active }) {
    let checkLogin = useSelector((state) => state.auth.isAuthentication);
    const [isLoading, setLoading] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        if (proId) {
            fetchComments();
        }
    }, [proId]);
    const fetchComments = async (valuePage = 1, valueLimit = 5) => {
        setLoading(true);
        const params = {
            pro_id: proId,
            page: valuePage,
            limit: valueLimit,
        };
        const response = await commentsApi.show(params);
        setCommentList(response.commentsList);
        setPage(response.page);
        setTotalPage(response.totalPage);
        setLoading(false);
    };
    const handleChangePage = (valuePage) => {
        if (valuePage > 0 && valuePage <= totalPage && valuePage !== page) {
            fetchComments(valuePage, 5);
        }
    };
    return (
        <div className={clsx(styles.wrapper, { [styles.active]: active })}>
            <h4 className={clsx(styles.title)}>Bình luận về {proName} </h4>
            {checkLogin ? (
                <Form proId={proId} isLoading={isLoading} fetchComments={fetchComments} />
            ) : (
                <span className={clsx(styles.notLogged)}>
                    Bạn hãy đăng nhập để có thể bình luận sản phẩm
                </span>
            )}
            <div className={clsx(styles.wrapperListComment)}>
                {isLoading && (
                    <>
                        <div className={clsx(styles.loading)}></div>
                        <div className={clsx(styles.textLoading)}>
                            <Button text success loading="Đang tải lại bài bình luận..." />
                        </div>
                    </>
                )}
                {commentList.map((item) => (
                    <CommentItem key={item.cmt_id} data={item} fetchComments={fetchComments} />
                ))}
            </div>
            <Pagination page={page} totalPage={totalPage} handleChangePage={handleChangePage} />
        </div>
    );
}

export default Comments;
