import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import categoryNewsApi from '../../../api/categoryNewsApi';
import Path from '../../../components/Path';
import Title from '../components/Title';
import Button from '../../../components/Button';
import ContentContainer from '../components/ContentContainer';
import TableContainer from '../components/TableContainer';
import Actions from './Actions';
import Nodata from '../../../components/NoData';
import Loading from './Loading';
import Pagination from '../../../components/Pagination';
import Item from './Item';
import Form from './Form';
import { addNewToastMessage } from '../../../redux/actions/toastMessage';

function CategoryNews() {
    const [isLoading, setLoading] = useState(true);
    const [isLoadingBtn, setLoadingBtn] = useState(false);
    const [isShowForm, setShowForm] = useState(false);
    const [categoryNewsList, setCategoryNewsList] = useState([]);
    const [params, setParams] = useState({
        name: '',
        status: '',
        limit: 10,
        page: 1,
        totalPage: '',
    });
    const [dataForm, setDataForm] = useState({
        typeAction: '',
        id: '',
        name: '',
        status: '',
    });
    const timeoutRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchCategoryNews();
    }, []);
    const fetchCategoryNews = async (name = '', status = '', limit = '', page = '') => {
        const data = {
            name,
            status,
            limit,
            page,
        };
        setLoading(true);
        const response = await categoryNewsApi.search(data);
        console.log(response);
        setLoading(false);
        setCategoryNewsList(response.dataCate);
        setParams({
            ...data,
            page: response.page,
            limit: response.limit,
            totalPage: response.totalPage,
        });
    };
    const handleChangeStatus = async (id) => {
        setLoadingBtn(true);
        const response = await categoryNewsApi.changeStatus(id);
        setLoadingBtn(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].mes));
        }
        dispatch(addNewToastMessage('success', 'Thành công', response[0].mes));
        fetchCategoryNews(params.name, params.status, params.limit, params.page);
    };
    const handleChangePage = async (valuePage) => {
        if (valuePage > 0 && valuePage <= params.totalPage && valuePage !== params.page) {
            fetchCategoryNews(params.name, params.status, params.limit, valuePage);
        }
    };
    const handleChangeParams = (valueParams) => {
        setParams(valueParams);
        fetchCategoryNews(
            valueParams.name,
            valueParams.status,
            valueParams.limit,
            valueParams.page,
        );
    };
    const handleChangeInput = (valueParams) => {
        setParams(valueParams);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            fetchCategoryNews(
                valueParams.name,
                valueParams.status,
                valueParams.limit,
                valueParams.page,
            );
        }, 500);
    };
    const handleShowForm = () => {
        setShowForm(!isShowForm);
    };
    const handleShowFormAdd = () => {
        setDataForm({ typeAction: 'add', id: '', name: '', status: '' });
        handleShowForm();
    };
    const handleAdd = async (values) => {
        const data = new FormData();
        data.append('_name', values.name);
        data.append('_status', values.status);
        setLoadingBtn(true);
        const response = await categoryNewsApi.add(data);
        setLoadingBtn(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].mes));
        }
        handleShowForm();
        dispatch(addNewToastMessage('success', 'Thành công', response[0].mes));
        fetchCategoryNews();
    };
    const handleShowFormUpdate = (valueId, valueName, valueStatus) => {
        setDataForm({ typeAction: 'update', id: valueId, name: valueName, status: valueStatus });
        handleShowForm();
    };
    const handleUpdate = async (values) => {
        const data = new FormData();
        data.append('_id', dataForm.id);
        data.append('_name', values.name);
        data.append('_status', values.status);
        setLoadingBtn(true);
        const response = await categoryNewsApi.update(data);
        setLoadingBtn(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].mes));
        }
        handleShowForm();
        dispatch(addNewToastMessage('success', 'Thành công', response[0].mes));
        fetchCategoryNews(params.name, params.status, params.limit, params.page);
    };
    const path = [
        {
            name: 'Danh mục tin tức',
            url: '/admin/danh-muc-tin-tuc',
        },
    ];
    return (
        <>
            <Path path={path} adminPath />
            <ContentContainer>
                {isShowForm && (
                    <Form
                        isLoadingBtn={isLoadingBtn}
                        isShowForm={isShowForm}
                        dataForm={dataForm}
                        handleUpdate={handleUpdate}
                        handleShowForm={handleShowForm}
                        handleAdd={handleAdd}
                    />
                )}
                <Title title="Danh mục tin tức">
                    <Button primary onClick={handleShowFormAdd}>
                        <i className="fa fa-plus"></i>
                        Thêm mới
                    </Button>
                </Title>
                <Actions
                    params={params}
                    handleChangeInput={handleChangeInput}
                    handleChangeParams={handleChangeParams}
                />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên danh mục</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật cuối</th>
                                <th>Hành động</th>
                            </tr>
                            {isLoading && <Loading count={params.limit} />}
                            {!isLoading &&
                                categoryNewsList.map((item, index) => (
                                    <Item
                                        key={item.id}
                                        stt={(params.page - 1) * params.limit + (index + 1)}
                                        item={item}
                                        isLoadingBtn={isLoadingBtn}
                                        handleChangeStatus={handleChangeStatus}
                                        handleShowFormUpdate={handleShowFormUpdate}
                                    />
                                ))}
                        </tbody>
                    </table>
                </TableContainer>
                {!isLoading && !categoryNewsList.length && <Nodata />}
                <Pagination
                    page={params.page}
                    totalPage={params.totalPage}
                    handleChangePage={handleChangePage}
                />
            </ContentContainer>
        </>
    );
}

export default CategoryNews;
