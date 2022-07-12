import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import contactApi from '../../../api/contactApi';
import NoData from '../../../components/NoData';
import Pagination from '../../../components/Pagination';
import Path from '../../../components/Path';
import ContentContainer from '../components/ContentContainer';
import TableContainer from '../components/TableContainer';
import Title from '../components/Title';
import Actions from './Actions';
import Form from './Form';
import Item from './Item';
import Loading from './Loading';
import { addNewToastMessage } from '../../../redux/actions/toastMessage';
function Contact() {
    const [isLoading, setLoading] = useState(true);
    const [isShowForm, setShowForm] = useState(false);
    const [isSubmitReply, setSubmitReply] = useState(false);
    const [contactList, setContactList] = useState([]);
    const [dataContact, setDataContact] = useState({});
    const [params, setParams] = useState({
        email: '',
        status: '',
        limit: 10,
        page: 10,
        totalPage: '',
    });
    const timeoutRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchContact();
    }, []);
    const fetchContact = async (email = '', status = '', limit = '', page = '') => {
        const data = { email, status, limit, page };
        setLoading(true);
        const response = await contactApi.search(data);
        setLoading(false);
        setContactList(response.contactList);
        setParams({
            ...data,
            page: response.page,
            limit: response.limit,
            totalPage: response.totalPage,
        });
    };
    const handleChangePage = async (valuePage) => {
        if (valuePage > 0 && valuePage <= params.totalPage && valuePage !== params.page) {
            fetchContact(params.email, params.status, params.limit, valuePage);
        }
    };
    const handleChangeParams = (data) => {
        setParams(data);
        fetchContact(data.email, data.status, data.limit, data.page);
    };
    const handleChangeInput = (data) => {
        setParams(data);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            fetchContact(data.email, data.status, data.limit, data.page);
        }, 500);
    };
    const handleShowForm = () => {
        setShowForm(!isShowForm);
    };
    const handleShowFormReply = (data) => {
        setDataContact(data);
        handleShowForm();
    };
    const handleReply = async (id, content) => {
        const data = new FormData();
        data.append('_id', id);
        data.append('_reply', content);
        setSubmitReply(true);
        const response = await contactApi.reply(data);
        setSubmitReply(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        handleShowForm();
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
        fetchContact(params.email, params.status, params.limit, params.page);
    };
    const path = [
        {
            name: 'Quản lý liên hệ',
            url: '/admin/lien-he',
        },
    ];
    return (
        <>
            <Path path={path} adminPath />
            <ContentContainer>
                {isShowForm && (
                    <Form
                        isSubmitReply={isSubmitReply}
                        isShowForm={isShowForm}
                        data={dataContact}
                        handleShowForm={handleShowForm}
                        handleReply={handleReply}
                    />
                )}
                <Title title="Danh sách liên hệ"></Title>
                <Actions
                    params={params}
                    handleChangeParams={handleChangeParams}
                    handleChangeInput={handleChangeInput}
                />
                <TableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên khách hàng</th>
                                <th>Email</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Hành động</th>
                            </tr>
                            {isLoading && <Loading count={params.limit} />}
                            {!isLoading &&
                                contactList.map((item, index) => (
                                    <Item
                                        key={item.c_id}
                                        stt={(params.page - 1) * params.limit + (index + 1)}
                                        item={item}
                                        handleShowFormReply={handleShowFormReply}
                                    />
                                ))}
                        </tbody>
                    </table>
                </TableContainer>
                {!isLoading && !contactList.length && <NoData />}
                <Pagination
                    page={params.page}
                    totalPage={params.totalPage}
                    handleChangePage={handleChangePage}
                />
            </ContentContainer>
        </>
    );
}

export default Contact;
