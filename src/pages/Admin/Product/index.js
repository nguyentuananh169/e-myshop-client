import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import productApi from '../../../api/productApi';
import Path from '../../../components/Path';
import Title from '../components/Title';
import Button from '../../../components/Button';
import ContentContainer from '../components/ContentContainer';
import TableContainer from '../components/TableContainer';
import Actions from './Actions';
import Nodata from '../../../components/NoData';
import Pagination from '../../../components/Pagination';
import { addNewToastMessage } from '../../../redux/actions/toastMessage';
import Form from './Form';
import Loading from './Loading';
import Item from './Item';
import ViewProduct from './ViewProduct';
function Product() {
    const [isLoading, setLoading] = useState(true);
    const [isShowForm, setShowForm] = useState(false);
    const [isLoadingSubmit, setLoadingSubmit] = useState(false);
    const [productList, setProductList] = useState([]);
    const [dataView, setDataView] = useState({});
    const [dataForm, setDataForm] = useState({
        typeAction: '',
        id: '',
        category: '',
        brand: '',
        name: '',
        qty: '',
        price: '',
        sale: 0,
        img: '',
        imgs: [],
        status: '',
        promotion: [],
        attr: [],
        des: '',
    });
    const [params, setParams] = useState({
        name: '',
        status: '',
        sortBy: '',
        sortDir: '',
        limit: 10,
        page: 1,
    });
    const dispatch = useDispatch();
    const timeoutRef = useRef(null);
    useEffect(() => {
        fetchProduct(params);
    }, []);
    const fetchProduct = async (valueParams = {}) => {
        setLoading(true);
        const response = await productApi.search(valueParams);
        setLoading(false);
        setParams((state) => ({
            ...state,
            page: response.page,
            totalPage: response.totalPage,
        }));
        setProductList(response.dataProduct);
    };
    const handleChangePage = async (valuePage) => {
        if (valuePage > 0 && valuePage <= params.totalPage && valuePage !== params.page) {
            fetchProduct({ ...params, page: valuePage });
        }
    };
    const handleChangeName = (value) => {
        setParams({ ...params, name: value });
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            fetchProduct({ ...params, name: value });
        }, 500);
    };
    const handleChangeLimit = (value) => {
        setParams({ ...params, limit: value });
        fetchProduct({ ...params, limit: value });
    };
    const handleChangeStatus = (value) => {
        setParams({ ...params, status: value });
        fetchProduct({ ...params, status: value });
    };
    const handleShowForm = () => {
        setShowForm(!isShowForm);
    };
    const handleViewProduct = (item) => {
        setDataForm({ ...dataForm, typeAction: 'view' });
        setDataView(item);
        handleShowForm();
    };
    const handleUpdateStatus = async (valueId, valueStatus) => {
        setLoading(true);
        const response = await productApi.changeStatus({ id: valueId, status: valueStatus });
        if (response[0].error === 0) {
            setShowForm(false);
            fetchProduct(params);
            dispatch(addNewToastMessage('success', 'Thành công', response[0].messages));
        } else {
            dispatch(addNewToastMessage('error', 'Thất bại', response[0].messages));
        }
    };
    const handleSetDataForm = (data) => {
        setDataForm(data);
    };
    const handleShowFormAdd = () => {
        setDataForm({
            typeAction: 'add',
            id: '',
            category: '',
            brand: '',
            name: '',
            qty: '',
            price: '',
            sale: 0,
            img: '',
            imgs: [],
            status: '',
            promotion: [],
            attr: [],
            des: '',
        });
        handleShowForm();
    };
    const handleSubmitForm = async (typeSubmit) => {
        setLoadingSubmit(true);
        const promotion = dataForm.promotion.filter((item) => item !== '');
        let arrayAttr = [];
        for (let i = 0; i < dataForm.attr.length; i++) {
            if (dataForm.attr[i].type !== '' && dataForm.attr[i].value.length > 0) {
                const id = dataForm.attr[i].id;
                const type = dataForm.attr[i].type;
                const value = [];
                for (let j = 0; j < dataForm.attr[i].value.length; j++) {
                    if (dataForm.attr[i].value[j].trim() !== '') {
                        value.push(dataForm.attr[i].value[j]);
                    }
                }
                arrayAttr.push({ id, type, value });
            }
        }
        const attribute = arrayAttr.filter((item) => item.value.length > 0);
        const data = new FormData();
        data.append('_id', dataForm.id);
        data.append('_category', dataForm.category);
        data.append('_brand', dataForm.brand);
        data.append('_name', dataForm.name);
        data.append('_qty', Number(dataForm.qty));
        data.append('_price', Number(dataForm.price));
        data.append('_sale', Number(dataForm.sale));
        data.append('_img', dataForm.img[0]);
        for (let i = 0; i < dataForm.imgs.length; i++) {
            data.append('_imgs[]', dataForm.imgs[i]);
        }
        data.append('_status', dataForm.status);
        data.append('_promotion', JSON.stringify(promotion));
        data.append('_attribute', JSON.stringify(attribute));
        data.append('_description', dataForm.des);
        let response;
        if (typeSubmit === 'add') {
            response = await productApi.add(data);
        } else {
            response = await productApi.update(data);
        }
        setLoadingSubmit(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].messages));
        }
        handleShowForm();
        setDataForm({ ...dataForm, typeAction: '' });
        dispatch(addNewToastMessage('success', 'Thành công', response[0].messages));
        fetchProduct(params);
    };
    const handleDelete = async (id, name) => {
        if (
            window.confirm(
                `Bạn có chắc muốn xóa sản phẩm "${name}" không ? Các dữ liệu liên quan sẽ bị xóa theo (VD: Bình luận, đánh giá...)`,
            )
        ) {
            const response = await productApi.delete(id);
            if (response[0].error === 1) {
                return dispatch(addNewToastMessage('error', 'Thất bại', response[0].messages));
            }
            dispatch(addNewToastMessage('success', 'Thành công', response[0].messages));
            fetchProduct(params);
        }
    };
    const handleShowFormUpdate = (data) => {
        setDataForm({
            typeAction: 'update',
            id: data.pro_id,
            category: data.cate_pro_id,
            brand: data.brand_pro_id,
            name: data.pro_name,
            qty: data.pro_qty,
            price: data.pro_price,
            sale: data.pro_sale,
            img: '',
            imgs: [],
            status: data.pro_status,
            promotion: JSON.parse(data.pro_promotion),
            attr: JSON.parse(data.pro_attr),
            des: data.pro_des,
        });
        handleShowForm();
    };
    const path = [
        {
            name: 'Sản phẩm',
            url: '/admin/san-pham',
        },
    ];
    return (
        <>
            <Path path={path} adminPath />
            <ContentContainer>
                <Title title="Danh sách sản phẩm">
                    <Button primary onClick={handleShowFormAdd}>
                        <i className="fa fa-plus"></i>
                        Thêm mới
                    </Button>
                </Title>
                <Actions
                    params={params}
                    handleChangeName={handleChangeName}
                    handleChangeLimit={handleChangeLimit}
                    handleChangeStatus={handleChangeStatus}
                />
                {(dataForm.typeAction === 'add' || dataForm.typeAction === 'update') && (
                    <Form
                        isLoadingSubmit={isLoadingSubmit}
                        isShowForm={isShowForm}
                        dataForm={dataForm}
                        handleShowForm={handleShowForm}
                        handleSetDataForm={handleSetDataForm}
                        handleSubmitForm={handleSubmitForm}
                    />
                )}
                {dataForm.typeAction === 'view' && (
                    <ViewProduct
                        dataView={dataView}
                        isShowForm={isShowForm}
                        handleShowForm={handleShowForm}
                        handleUpdateStatus={handleUpdateStatus}
                    />
                )}
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên sản phẩm</th>
                                <th>Hình ảnh</th>
                                <th>Thông tin</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                            {isLoading && <Loading count={params.limit} />}
                            {!isLoading &&
                                productList.map((item, index) => (
                                    <Item
                                        key={item.pro_id}
                                        stt={(params.page - 1) * params.limit + (index + 1)}
                                        item={item}
                                        handleViewProduct={handleViewProduct}
                                        handleUpdateStatus={handleUpdateStatus}
                                        handleDelete={handleDelete}
                                        handleShowFormUpdate={handleShowFormUpdate}
                                    />
                                ))}
                        </tbody>
                    </table>
                </TableContainer>
                {!isLoading && !productList.length && <Nodata />}
                <Pagination
                    page={params.page}
                    totalPage={params.totalPage}
                    handleChangePage={handleChangePage}
                />
            </ContentContainer>
        </>
    );
}

export default Product;
