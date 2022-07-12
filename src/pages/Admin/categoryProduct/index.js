import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import categoryProductApi from '../../../api/categoryProductApi';
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

function CatgoryProduct() {
    const [valueInput, setValueInput] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [limit, setLimit] = useState(10);
    const [status, setStatus] = useState('');
    const [page, setPage] = useState('');
    const [totalPage, setTotalPage] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [isLoadingBtn, setLoadingBtn] = useState(false);
    const [isShowForm, setShowForm] = useState(false);
    const [stateForm, setStateForm] = useState({
        typeAction: 'add',
        id: '',
        name: '',
        img: '',
        status: '0',
    });
    const timeoutRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchCategoryProduct();
    }, []);
    const fetchCategoryProduct = async (name = '', status = '', page = 1, limit = 10) => {
        const params = {
            name,
            status,
            page,
            limit,
        };
        setLoading(true);
        const response = await categoryProductApi.search(params);
        setLoading(false);
        setPage(response.page);
        setTotalPage(response.totalPage);
        setCategoryList(response.dataCate);
    };
    const handleChangeInput = (value) => {
        setValueInput(value);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            fetchCategoryProduct(value, status, 1, limit);
        }, 500);
    };
    const handleChangeLimit = (value) => {
        setLimit(value);
        fetchCategoryProduct(valueInput, status, 1, value);
    };
    const handleChangeStatus = (value) => {
        setStatus(value);
        fetchCategoryProduct(valueInput, value, 1, limit);
    };
    const handleChangePage = (valuePage) => {
        if (valuePage > 0 && valuePage <= totalPage && valuePage !== page) {
            fetchCategoryProduct(valueInput, status, valuePage, limit);
        }
    };
    const handleShowForm = () => {
        setShowForm(!isShowForm);
    };
    const handleSetStateForm = (state) => {
        setStateForm(state);
    };
    const handleShowFormAdd = () => {
        setStateForm({ typeAction: 'add', id: '', name: '', img: '', status: '0' });
        handleShowForm();
    };
    const handleShowFormUpdate = (id, name, status) => {
        setStateForm({ typeAction: 'update', id, name, img: '', status });
        handleShowForm();
    };
    const handleAdd = async () => {
        const params = new FormData();
        params.append('_name', stateForm.name);
        params.append('_img', stateForm.img[0]);
        params.append('_status', stateForm.status);
        setLoadingBtn(true);
        const response = await categoryProductApi.add(params);
        setLoadingBtn(false);
        if (response[0].err === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].mess));
        }
        setStateForm({ typeAction: 'add', id: '', name: '', img: '', status: '0' });
        handleShowForm();
        dispatch(addNewToastMessage('success', 'Thành công', response[0].mess));
        setLimit(10);
        setPage(1);
        setValueInput('');
        setStatus('');
        fetchCategoryProduct();
    };
    const handleUpdate = async () => {
        const params = new FormData();
        params.append('_id', stateForm.id);
        params.append('_name', stateForm.name);
        params.append('_img', stateForm.img[0]);
        params.append('_status', stateForm.status);
        setLoadingBtn(true);
        const response = await categoryProductApi.update(params);
        setLoadingBtn(false);
        if (response[0].err === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].mess));
        }
        setStateForm({ typeAction: 'add', id: '', name: '', img: '', status: '0' });
        handleShowForm();
        dispatch(addNewToastMessage('success', 'Thành công', response[0].mess));
        setLimit(10);
        setPage(1);
        setValueInput('');
        setStatus('');
        fetchCategoryProduct();
    };
    const handleStatus = async (id) => {
        setLoadingBtn(true);
        const response = await categoryProductApi.changeStatus(id);
        setLoadingBtn(false);
        if (response[0].err === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].mess));
        }
        dispatch(addNewToastMessage('success', 'Thành công', response[0].mess));
        fetchCategoryProduct(valueInput, status, page, limit);
    };
    const handleDelete = async (id, name) => {
        if (window.confirm(`Bạn có chắc muốn xóa danh mục " ${name} " ?`)) {
            setLoading(true);
            const response = await categoryProductApi.delete(id);
            if (response[0].err === 1) {
                return dispatch(addNewToastMessage('error', 'Thất bại', response[0].mess));
            }
            dispatch(addNewToastMessage('success', 'Thành công', response[0].mess));
            fetchCategoryProduct();
        }
    };
    const path = [
        {
            name: 'Danh mục sản phẩm',
            url: '/admin/danh-muc-san-pham',
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
                        stateForm={stateForm}
                        handleSetStateForm={handleSetStateForm}
                        handleAdd={handleAdd}
                        handleUpdate={handleUpdate}
                        handleShowForm={handleShowForm}
                    />
                )}
                <Title title="Danh mục sản phẩm">
                    <Button primary onClick={handleShowFormAdd}>
                        <i className="fa fa-plus"></i>
                        Thêm mới
                    </Button>
                </Title>
                <Actions
                    valueInput={valueInput}
                    limit={limit}
                    status={status}
                    handleChangeInput={handleChangeInput}
                    handleChangeLimit={handleChangeLimit}
                    handleChangeStatus={handleChangeStatus}
                />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên danh mục</th>
                                <th>Hình ảnh</th>
                                <th>Trang chủ</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật cuối</th>
                                <th>Hành động</th>
                            </tr>
                            {isLoading && <Loading count={limit} />}
                            {!isLoading &&
                                categoryList.map((item, index) => (
                                    <Item
                                        key={item.id}
                                        stt={(page - 1) * limit + (index + 1)}
                                        item={item}
                                        isLoadingBtn={isLoadingBtn}
                                        handleShowFormUpdate={handleShowFormUpdate}
                                        handleDelete={handleDelete}
                                        handleStatus={handleStatus}
                                    />
                                ))}
                        </tbody>
                    </table>
                </TableContainer>
                {!isLoading && !categoryList.length && <Nodata />}
                <Pagination page={page} totalPage={totalPage} handleChangePage={handleChangePage} />
            </ContentContainer>
        </>
    );
}

export default CatgoryProduct;
