import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import bannerHomeApi from '../../../api/bannerHomeApi';
import NoData from '../../../components/NoData';
import Pagination from '../../../components/Pagination';
import Path from '../../../components/Path';
import ContentContainer from '../components/ContentContainer';
import TableContainer from '../components/TableContainer';
import Title from '../components/Title';
import Form from './Form';
import Item from './Item';
import Loading from './Loading';
import Button from '../../../components/Button';
import { addNewToastMessage } from '../../../redux/actions/toastMessage';
import Actions from './Actions';
function BannerHome() {
    const [isLoading, setLoading] = useState(true);
    const [isShowForm, setShowForm] = useState(false);
    const [isSubmit, setSubmit] = useState(false);
    const [bannerList, setBannerList] = useState([]);
    const [dataBanner, setDataBanner] = useState({
        typeAction: '',
        id: '',
        img: '',
        link: '#',
    });
    const [params, setParams] = useState({
        limit: 10,
        page: 10,
        totalPage: '',
    });
    const dispatch = useDispatch();
    useEffect(() => {
        fetchBanner();
    }, []);
    const fetchBanner = async (limit = '', page = '') => {
        const data = { limit, page };
        setLoading(true);
        const response = await bannerHomeApi.search(data);
        setLoading(false);
        setBannerList(response.bannerList);
        setParams({
            page: response.page,
            limit: response.limit,
            totalPage: response.totalPage,
        });
    };
    const handleChangePage = (valuePage) => {
        if (valuePage > 0 && valuePage <= params.totalPage && valuePage !== params.page) {
            fetchBanner(params.limit, valuePage);
        }
    };
    const handleChangeParams = (data) => {
        setParams(data);
        fetchBanner(data.limit, data.page);
    };
    const handleShowForm = () => {
        setShowForm(!isShowForm);
    };
    const handleSetDataBanner = (data) => {
        setDataBanner(data);
    };
    const handleShowFormAdd = () => {
        setDataBanner({ typeAction: 'add', id: '', img: '', link: '#' });
        handleShowForm();
    };
    const handleAdd = async () => {
        const data = new FormData();
        data.append('_img', dataBanner.img[0]);
        data.append('_link', dataBanner.link);
        setSubmit(true);
        const response = await bannerHomeApi.add(data);
        setSubmit(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        handleShowForm();
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
        fetchBanner();
    };
    const handleShowFormUpdate = (data) => {
        setDataBanner({ typeAction: 'update', id: data.bh_id, img: '', link: data.bh_link });
        handleShowForm();
    };
    const handleUpdate = async () => {
        const data = new FormData();
        data.append('_id', dataBanner.id);
        data.append('_img', dataBanner.img[0]);
        data.append('_link', dataBanner.link);
        setSubmit(true);
        const response = await bannerHomeApi.update(data);
        setSubmit(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        handleShowForm();
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
        fetchBanner(params.limit, params.page);
    };
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa banner này ?')) {
            setLoading(true);
            const response = await bannerHomeApi.delete(id);
            if (response[0].error === 1) {
                return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
            }
            dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
            fetchBanner(params.limit, params.page);
        }
    };
    const path = [
        {
            name: 'Banner trang chủ',
            url: '/admin/banner-trang-chu',
        },
    ];
    return (
        <>
            <Path path={path} adminPath />
            <ContentContainer>
                {isShowForm && (
                    <Form
                        isShowForm={isShowForm}
                        isSubmit={isSubmit}
                        data={dataBanner}
                        handleSetDataBanner={handleSetDataBanner}
                        handleShowForm={handleShowForm}
                        handleAdd={handleAdd}
                        handleUpdate={handleUpdate}
                    />
                )}
                <Title title="Danh sách banner">
                    <Button primary onClick={handleShowFormAdd}>
                        <i className="fa fa-plus"></i>
                        Thêm mới
                    </Button>
                </Title>
                <Actions params={params} handleChangeParams={handleChangeParams} />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Hình ảnh</th>
                                <th>Link</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật cuối</th>
                                <th>Hành động</th>
                            </tr>
                            {isLoading && <Loading count={params.limit} />}
                            {!isLoading &&
                                bannerList.map((item, index) => (
                                    <Item
                                        key={item.bh_id}
                                        stt={(params.page - 1) * params.limit + (index + 1)}
                                        item={item}
                                        handleShowFormUpdate={handleShowFormUpdate}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                        </tbody>
                    </table>
                </TableContainer>
                {!isLoading && !bannerList.length && <NoData />}
                <Pagination
                    page={params.page}
                    totalPage={params.totalPage}
                    handleChangePage={handleChangePage}
                />
            </ContentContainer>
        </>
    );
}

export default BannerHome;
