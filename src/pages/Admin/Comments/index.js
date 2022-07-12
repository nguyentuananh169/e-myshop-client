import { useEffect, useState } from 'react';
import commentsApi from '../../../api/commentsApi';
import Path from '../../../components/Path';
import Title from '../components/Title';
import ContentContainer from '../components/ContentContainer';
import TableContainer from '../components/TableContainer';
import Nodata from '../../../components/NoData';
import Pagination from '../../../components/Pagination';
import Loading from './Loading';
import Item from './Item';
import Actions from './Actions';
import View from './View';
function Comments() {
    const [isLoading, setLoading] = useState(true);
    const [isViewComments, setViewComments] = useState(false);
    const [dataComments, setDataComments] = useState({});
    const [commentList, setCommentList] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        totalPage: '',
        limit: 10,
    });
    useEffect(() => {
        fetchComments();
    }, []);
    const fetchComments = async (page = '', limit = '') => {
        const data = {
            page,
            limit,
        };
        setLoading(true);
        const response = await commentsApi.showAll(data);
        setLoading(false);
        setCommentList(response.commentsList);
        setParams({
            page: response.page,
            totalPage: response.totalPage,
            limit: response.limit,
        });
    };
    const handleChangePage = async (valuePage) => {
        if (valuePage > 0 && valuePage <= params.totalPage && valuePage !== params.page) {
            fetchComments(valuePage, params.limit);
        }
    };
    const handleChangeParams = (data) => {
        setParams(data);
        fetchComments(data.page, data.limit);
    };
    const handleViewComments = () => {
        setViewComments(!isViewComments);
    };
    const handleSetDataComments = (data) => {
        setDataComments(data);
        handleViewComments();
    };
    const path = [
        {
            name: 'Quản lý bình luận',
            url: '/admin/binh-luan',
        },
    ];
    return (
        <>
            <Path path={path} adminPath />
            <ContentContainer>
                {isViewComments && (
                    <View
                        dataComments={dataComments}
                        isViewComments={isViewComments}
                        handleViewComments={handleViewComments}
                        fetchComments={fetchComments}
                        params={params}
                    />
                )}

                <Title title="Danh sách bình luận"></Title>
                <Actions params={params} handleChangeParams={handleChangeParams} />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Thông tin</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                            {isLoading && <Loading count={params.limit} />}
                            {!isLoading &&
                                commentList.map((item, index) => (
                                    <Item
                                        key={item.cmt_id}
                                        stt={(params.page - 1) * params.limit + (index + 1)}
                                        item={item}
                                        handleSetDataComments={handleSetDataComments}
                                    />
                                ))}
                        </tbody>
                    </table>
                </TableContainer>
                {!isLoading && !commentList.length && <Nodata />}
                <Pagination
                    page={params.page}
                    totalPage={params.totalPage}
                    handleChangePage={handleChangePage}
                />
            </ContentContainer>
        </>
    );
}

export default Comments;
