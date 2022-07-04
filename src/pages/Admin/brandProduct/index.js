import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import categoryProductApi from '../../../api/categoryProductApi';
import brandProductApi from '../../../api/brandProductApi';
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
    const [isShowForm, setShowForm] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingBtn, setLoadingBtn] = useState(false);
    const [isLoadingCate, setLoadingCate] = useState(true);
    const [brandList, setBrandList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [params, setParams] = useState({
        name: '',
        cateId: '',
        limit: 10,
        page: 1,
        totalPage: '',
    });
    const [dataForm, setDataForm] = useState({
        typeAction: '',
        id: '',
        cateId: '',
        name: '',
        img: '',
    });
    const timeoutRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCategoryProduct = async () => {
            setLoadingCate(true);
            const response = await categoryProductApi.getAll();
            setLoadingCate(false);
            setCategoryList(response);
        };
        fetchCategoryProduct();
        fetchBrandProduct();
    }, []);
    const fetchBrandProduct = async (name = '', cateId = '', limit = '', page = '') => {
        const params = {
            name,
            cateId,
            limit,
            page,
        };
        setLoading(true);
        const response = await brandProductApi.search(params);
        setLoading(false);
        setBrandList(response.dataBrand);
        setParams({
            ...params,
            page: response.page,
            limit: response.limit,
            totalPage: response.totalPage,
        });
    };
    const handleChangeParams = (valueParams) => {
        setParams(valueParams);
        fetchBrandProduct(
            valueParams.name,
            valueParams.cateId,
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
            fetchBrandProduct(
                valueParams.name,
                valueParams.cateId,
                valueParams.limit,
                valueParams.page,
            );
        }, 500);
    };
    const handleChangePage = async (valuePage) => {
        if (valuePage > 0 && valuePage <= params.totalPage && valuePage !== params.page) {
            fetchBrandProduct(params.name, params.cateId, params.limit, valuePage);
        }
    };
    const handleShowForm = () => {
        setShowForm(!isShowForm);
    };
    const handleSetDataForm = (state) => {
        setDataForm(state);
    };
    const handleShowFormAdd = () => {
        setDataForm({ typeAction: 'add', id: '', cateId: '', name: '', img: '' });
        handleShowForm();
    };
    const handleAdd = async () => {
        const data = new FormData();
        data.append('_cate_id', dataForm.cateId);
        data.append('_name', dataForm.name);
        data.append('_img', dataForm.img);
        setLoadingBtn(true);
        const response = await brandProductApi.add(data);
        setLoadingBtn(false);
        if (response[0].err === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].mes));
        }
        dispatch(addNewToastMessage('success', 'Thành công', response[0].mes));
        setDataForm({ typeAction: '', id: '', cateId: '', name: '', img: '' });
        fetchBrandProduct();
        handleShowForm();
    };
    const handleShowFormUpdate = (id, cateId, name) => {
        setDataForm({ typeAction: 'update', id, cateId, name, img: '' });
        handleShowForm();
    };
    const handleUpdate = async () => {
        const data = new FormData();
        data.append('_id', dataForm.id);
        data.append('_cate_id', dataForm.cateId);
        data.append('_name', dataForm.name);
        data.append('_img', dataForm.img);
        setLoadingBtn(true);
        const response = await brandProductApi.update(data);
        setLoadingBtn(false);
        if (response[0].err === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].mes));
        }
        dispatch(addNewToastMessage('success', 'Thành công', response[0].mes));
        setDataForm({ typeAction: '', id: '', cateId: '', name: '', img: '' });
        fetchBrandProduct(params.name, params.cateId, params.limit, params.page);
        handleShowForm();
    };
    const handleDelete = async (id, cateName, brandName) => {
        if (
            window.confirm(
                `Bạn có chắc muốn xóa thương hiệu "${brandName}" của danh mục "${cateName}" ?`,
            )
        ) {
            setLoadingBtn(true);
            const response = await brandProductApi.delete(id);
            setLoadingBtn(false);
            if (response[0].err === 1) {
                return dispatch(addNewToastMessage('error', 'Thất bại', response[0].mes));
            }
            dispatch(addNewToastMessage('success', 'Thành công', response[0].mes));
            fetchBrandProduct(params.name, params.cateId, params.limit, params.page);
        }
    };
    const path = [
        {
            name: 'Thương hiệu sản phẩm',
            url: '/admin/thuong-hieu-san-pham',
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
                        categoryList={categoryList}
                        handleSetDataForm={handleSetDataForm}
                        handleShowForm={handleShowForm}
                        handleAdd={handleAdd}
                        handleUpdate={handleUpdate}
                    />
                )}
                <Title title="Thương hiệu sản phẩm">
                    <Button primary onClick={handleShowFormAdd}>
                        <i className="fa fa-plus"></i>
                        Thêm mới
                    </Button>
                </Title>
                <Actions
                    isLoadingCate={isLoadingCate}
                    params={params}
                    categoryList={categoryList}
                    handleChangeInput={handleChangeInput}
                    handleChangeParams={handleChangeParams}
                />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên thương hiệu</th>
                                <th>Danh mục</th>
                                <th>Logo</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật cuối</th>
                                <th>Hành động</th>
                            </tr>
                            {isLoading && <Loading count={params.limit} />}
                            {!isLoading &&
                                brandList.map((item, index) => (
                                    <Item
                                        key={item.id}
                                        stt={(params.page - 1) * params.limit + (index + 1)}
                                        item={item}
                                        isLoadingBtn={isLoadingBtn}
                                        handleShowFormUpdate={handleShowFormUpdate}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                        </tbody>
                    </table>
                </TableContainer>
                {!isLoading && !brandList.length && <Nodata />}
                <Pagination
                    page={params.page}
                    totalPage={params.totalPage}
                    handleChangePage={handleChangePage}
                />
            </ContentContainer>
        </>
    );
}

export default CatgoryProduct;
