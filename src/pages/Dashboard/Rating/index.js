import { useEffect, useState } from 'react';
import ratingApi from '../../../api/ratingApi';
import ContentRight from '../components/ContentRight';
import HeaderRight from '../components/HeaderRight';
import NoData from '../../../components/NoData';
import CommentItem from '../components/CommentItem';
import Pagination from '../../../components/Pagination';
import Loading from '../components/CommentItem/Loading';
import bg from '../../../assets/img/background/icon-account-comment.png';
function Rating() {
    const [isLoading, setLoading] = useState(true);
    const [listRating, setListRating] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setToltalPage] = useState(0);
    useEffect(() => {
        fetchRatingList();
    }, []);
    const fetchRatingList = async (page = 1, limit = 4) => {
        const params = {
            page,
            limit,
        };
        setLoading(true);
        const response = await ratingApi.showByUserId(params);
        setLoading(false);
        setListRating(response.ratingList);
        setPage(response.page);
        setToltalPage(response.totalPage);
    };
    const handleChangePage = (valuePage) => {
        if (valuePage > 0 && valuePage <= totalPage && valuePage !== page) {
            fetchRatingList(valuePage);
        }
    };
    return (
        <>
            <HeaderRight
                title="Quản lý đánh giá"
                text="Xem và kiểm tra các lần đánh giá sản phẩm của bạn tại đây"
                background={bg}
            />
            <ContentRight title="Đánh giá của bạn">
                {!isLoading && !listRating.length && <NoData />}
                {isLoading ? (
                    <Loading count={3} />
                ) : (
                    listRating.map((item) => (
                        <CommentItem key={item.r_id} item={item} type="rating" />
                    ))
                )}
                <Pagination page={page} totalPage={totalPage} handleChangePage={handleChangePage} />
            </ContentRight>
        </>
    );
}

export default Rating;
