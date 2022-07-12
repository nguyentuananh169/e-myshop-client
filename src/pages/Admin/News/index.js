import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import newsApi from '../../../api/newsApi';
import categoryNewsApi from '../../../api/categoryNewsApi';
import Path from '../../../components/Path';
import ContentContainer from '../components/ContentContainer';
import TableContainer from '../components/TableContainer';
import Title from '../components/Title';
import Button from '../../../components/Button';
import Actions from './Actions';
import Item from './Item';
import Loading from './Loading';
import NoData from '../../../components/NoData';
import Pagination from '../../../components/Pagination';
import View from './View';
import Form from './Form';
import { addNewToastMessage } from '../../../redux/actions/toastMessage';
function News() {
    const [isLoading, setLoading] = useState(true);
    const [isLoadingCate, setLoadingCate] = useState(true);
    const [isLoadingBtn, setLoadingBtn] = useState(false);
    const [isShowForm, setShowForm] = useState(false);
    const [isLoadingSubmit, setLoadingSubmit] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [newsList, setNewsList] = useState([]);
    const [dataView, setDataView] = useState({});
    const [params, setParams] = useState({
        title: '',
        category: '',
        limit: 10,
        page: 1,
        totalPage: '',
    });
    const [dataForm, setDataForm] = useState({
        typeAction: '',
        id: '',
        cateId: '',
        title: '',
        summary: '',
        img: '',
        status: '',
        content: '',
    });
    const timeoutRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCategoryNews = async () => {
            setLoadingCate(true);
            const response = await categoryNewsApi.getAll();
            setLoadingCate(false);
            setCategoryList(response.dataCate);
        };
        fetchCategoryNews();
        fetchNews();
    }, []);
    const fetchNews = async (title = '', category = '', limit = '', page = '') => {
        const data = { title, category, limit, page };
        setLoading(true);
        const response = await newsApi.search(data);
        setLoading(false);
        setNewsList(response.dataNews);
        setParams({
            ...data,
            limit: response.limit,
            page: response.page,
            totalPage: response.totalPage,
        });
    };
    const handleChangeParams = (valueData) => {
        setDataForm(valueData);
        fetchNews(valueData.title, valueData.category, valueData.limit, valueData.page);
    };
    const handleChangeInput = (valueParams) => {
        setParams(valueParams);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            fetchNews(valueParams.title, valueParams.category, valueParams.limit, valueParams.page);
        }, 500);
    };
    const handleChangePage = async (valuePage) => {
        if (valuePage > 0 && valuePage <= params.totalPage && valuePage !== params.page) {
            fetchNews(params.title, params.category, params.limit, valuePage);
        }
    };
    const handleShowForm = () => {
        setShowForm(!isShowForm);
    };
    const handleShowView = (item) => {
        setDataForm({ ...dataForm, typeAction: 'view' });
        setDataView(item);
        handleShowForm();
    };
    const handleShowFormAdd = () => {
        setDataForm({
            typeAction: 'add',
            id: '',
            cateId: '',
            title: '',
            summary: '',
            img: '',
            status: '0',
            content: '',
        });
        handleShowForm();
    };
    const handleShowFormUpdate = (item) => {
        setDataForm({
            typeAction: 'update',
            id: item.news_id,
            cateId: item.cate_id,
            title: item.news_title,
            summary: item.news_summary,
            img: '',
            status: item.news_status,
            content: item.news_content,
        });
        handleShowForm();
    };
    const handleSetDataForm = (data) => {
        setDataForm(data);
    };
    const handleAdd = async () => {
        const data = new FormData();
        data.append('_category', dataForm.cateId);
        data.append('_title', dataForm.title);
        data.append('_summary', dataForm.summary);
        data.append('_img', dataForm.img[0]);
        data.append('_status', dataForm.status);
        data.append('_content', dataForm.content);
        setLoadingSubmit(true);
        const response = await newsApi.add(data);
        setLoadingSubmit(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
        handleShowForm();
        fetchNews();
    };
    const handleUpdate = async () => {
        const data = new FormData();
        data.append('_id', dataForm.id);
        data.append('_category', dataForm.cateId);
        data.append('_title', dataForm.title);
        data.append('_summary', dataForm.summary);
        data.append('_img', dataForm.img[0]);
        data.append('_status', dataForm.status);
        data.append('_content', dataForm.content);
        setLoadingSubmit(true);
        const response = await newsApi.update(data);
        setLoadingSubmit(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
        handleShowForm();
        fetchNews(params.title, params.category, params.limit, params.page);
    };
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa tin tức này ?')) {
            const response = await newsApi.delete(id);
            if (response[0].error === 1) {
                return dispatch(addNewToastMessage('error', 'Thất bại', response[0].mes));
            }
            dispatch(addNewToastMessage('success', 'Thành công', response[0].mes));
            fetchNews(params.title, params.category, params.limit, params.page);
        }
    };
    const handleChangeStatus = async (id) => {
        setLoadingBtn(true);
        const response = await newsApi.changeStatus(id);
        setLoadingBtn(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
        fetchNews(params.title, params.category, params.limit, params.page);
    };
    const path = [
        {
            name: 'Danh sách tin tức',
            url: '/admin/tin-tuc',
        },
    ];
    return (
        <>
            <Path path={path} adminPath />
            <ContentContainer>
                <Title title="Danh sách tin tức">
                    <Button primary onClick={handleShowFormAdd}>
                        <i className="fa fa-plus"></i>
                        Thêm mới
                    </Button>
                </Title>
                <Actions
                    isLoadingCate={isLoadingCate}
                    categoryList={categoryList}
                    params={params}
                    handleChangeParams={handleChangeParams}
                    handleChangeInput={handleChangeInput}
                />
                {(dataForm.typeAction === 'add' || dataForm.typeAction === 'update') &&
                    isShowForm && (
                        <Form
                            categoryList={categoryList}
                            dataForm={dataForm}
                            isLoadingSubmit={isLoadingSubmit}
                            isShowForm={isShowForm}
                            handleShowForm={handleShowForm}
                            handleSetDataForm={handleSetDataForm}
                            handleAdd={handleAdd}
                            handleUpdate={handleUpdate}
                        />
                    )}
                {dataForm.typeAction === 'view' && (
                    <View
                        dataView={dataView}
                        isShowForm={isShowForm}
                        handleShowForm={handleShowForm}
                    />
                )}
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên danh mục</th>
                                <th>Hình ảnh</th>
                                <th>Tiêu đề</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Hành động</th>
                            </tr>
                            {isLoading && <Loading count={params.limit} />}
                            {!isLoading &&
                                newsList.map((item, index) => (
                                    <Item
                                        key={item.news_id}
                                        stt={(params.page - 1) * params.limit + (index + 1)}
                                        item={item}
                                        isLoadingBtn={isLoadingBtn}
                                        handleShowView={handleShowView}
                                        handleShowFormUpdate={handleShowFormUpdate}
                                        handleChangeStatus={handleChangeStatus}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                        </tbody>
                    </table>
                    {!isLoading && !newsList.length && <NoData />}
                    <Pagination
                        page={params.page}
                        totalPage={params.totalPage}
                        handleChangePage={handleChangePage}
                    />
                </TableContainer>
            </ContentContainer>
        </>
    );
}

export default News;
