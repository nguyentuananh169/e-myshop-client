import { useEffect, useState } from 'react';
import commentsApi from '../../../api/commentsApi';
import ContentRight from '../components/ContentRight';
import HeaderRight from '../components/HeaderRight';
import NoData from '../../../components/NoData';
import CommentItem from '../components/CommentItem';
import Pagination from '../../../components/Pagination';
import Loading from '../components/CommentItem/Loading';
import bg from '../../../assets/img/background/icon-account-comment.png';
function Comments() {
    const [isLoading, setLoading] = useState(true);
    const [listComments, setListComments] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setToltalPage] = useState(0);
    useEffect(() => {
        fetchCommentList();
    }, []);
    const fetchCommentList = async (page = 1, limit = 4) => {
        const params = {
            page,
            limit,
        };
        setLoading(true);
        const response = await commentsApi.showByUserId(params);
        setLoading(false);
        setListComments(response.commentsList);
        setPage(response.page);
        setToltalPage(response.totalPage);
    };
    const handleChangePage = (valuePage) => {
        if (valuePage > 0 && valuePage <= totalPage && valuePage !== page) {
            fetchCommentList(valuePage);
        }
    };
    return (
        <>
            <HeaderRight
                title="Quản lý bình luận"
                text="Xem và kiểm tra những bình luận của bạn tại đây"
                background={bg}
            />
            <ContentRight title="Bình luận của bạn">
                {!isLoading && !listComments.length && <NoData />}
                {isLoading ? (
                    <Loading count={3} />
                ) : (
                    listComments.map((item) => (
                        <CommentItem key={item.cmt_id} item={item} type="comments" />
                    ))
                )}
                <Pagination page={page} totalPage={totalPage} handleChangePage={handleChangePage} />
            </ContentRight>
        </>
    );
}

export default Comments;
