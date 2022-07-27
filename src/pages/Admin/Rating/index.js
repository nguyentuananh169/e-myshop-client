import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ratingApi from '../../../api/ratingApi';
import Path from '../../../components/Path';
import Title from '../components/Title';
import ContentContainer from '../components/ContentContainer';
import TableContainer from '../components/TableContainer';
import Nodata from '../../../components/NoData';
import Pagination from '../../../components/Pagination';
import { addNewToastMessage } from '../../../redux/actions/toastMessage';
import Loading from './Loading';
import Item from './Item';
import Actions from './Actions';
import View from './View';
function Rating() {
    const [isLoading, setLoading] = useState(true);
    const [isChangeStatus, setChangeStatus] = useState(false);
    const [isViewRating, setViewRating] = useState(false);
    const [dataRating, setDataRating] = useState({});
    const [ratingList, setRatingList] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        totalPage: '',
        limit: 10,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        fetchRating();
    }, []);
    const fetchRating = async (page = '', limit = '') => {
        const data = {
            page,
            limit,
        };
        setLoading(true);
        const response = await ratingApi.showAll(data);
        setLoading(false);
        setRatingList(response.ratingList);
        setParams({ page: response.page, totalPage: response.totalPage, limit: response.limit });
    };
    const handleChangePage = async (valuePage) => {
        if (valuePage > 0 && valuePage <= params.totalPage && valuePage !== params.page) {
            fetchRating(valuePage, params.limit);
        }
    };
    const handleChangeParams = (data) => {
        setParams(data);
        fetchRating(data.page, data.limit);
    };
    const handleViewRating = () => {
        setViewRating(!isViewRating);
    };
    const handleSetDataRating = (data) => {
        setDataRating(data);
        handleViewRating();
    };
    const handleChangeStatus = async (id) => {
        setChangeStatus(true);
        const response = await ratingApi.changeStatus(id);
        setChangeStatus(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
        fetchRating(params.page, params.limit);
    };
    const path = [
        {
            name: 'Quản lý đánh giá',
            url: '/admin/danh-gia',
        },
    ];
    return (
        <>
            <Path path={path} adminPath />
            <ContentContainer>
                {isViewRating && (
                    <View
                        dataRating={dataRating}
                        isViewRating={isViewRating}
                        handleViewRating={handleViewRating}
                        fetchRating={fetchRating}
                        params={params}
                    />
                )}

                <Title title="Danh sách đánh giá"></Title>
                <Actions params={params} handleChangeParams={handleChangeParams} />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Thông tin</th>
                                <th>Trạng thái</th>
                                <th>Top đánh giá</th>
                                <th>Hành động</th>
                            </tr>
                            {isLoading && <Loading count={params.limit} />}
                            {!isLoading &&
                                ratingList.map((item, index) => (
                                    <Item
                                        key={item.r_id}
                                        stt={(params.page - 1) * params.limit + (index + 1)}
                                        item={item}
                                        isChangeStatus={isChangeStatus}
                                        handleSetDataRating={handleSetDataRating}
                                        handleChangeStatus={handleChangeStatus}
                                    />
                                ))}
                        </tbody>
                    </table>
                </TableContainer>
                {!isLoading && !ratingList.length && <Nodata />}
                <Pagination
                    page={params.page}
                    totalPage={params.totalPage}
                    handleChangePage={handleChangePage}
                />
            </ContentContainer>
        </>
    );
}

export default Rating;
