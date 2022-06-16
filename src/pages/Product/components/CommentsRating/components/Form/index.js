import { useState } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import commentsApi from '../../../../../../api/commentsApi';
import ratingApi from '../../../../../../api/ratingApi';
import Button from '../../../../../../components/Button';
import { addNewToastMessage } from '../../../../../../redux/actions/toastMessage';
import styles from './Form.module.css';
function Form({
    proId,
    parentComment = 0,
    type = 'comment',
    handleShowFormLv2,
    fetchComments,
    fetchRating,
}) {
    const starArray = [1, 2, 3, 4, 5];
    const [isLoadingAdd, setLoadingAdd] = useState(false);
    const [content, setContent] = useState('');
    const [star, setStar] = useState(0);
    const dispatch = useDispatch();
    const handleAddComment = async () => {
        let value = content.trim();
        if (!value) {
            return dispatch(addNewToastMessage('error', 'Thất bại', 'Bạn chưa nhập nội dung'));
        }
        if (value.length < 5) {
            return dispatch(addNewToastMessage('error', 'Thất bại', 'Nội dung tối thiểu 5 ký tự'));
        }
        if (type === 'rating') {
            if (!handleShowFormLv2 && (star < 1 || star > 5)) {
                return dispatch(
                    addNewToastMessage('error', 'Thất bại', 'Bạn chưa chọn sao đánh giá'),
                );
            }
        }
        setLoadingAdd(true);
        const params = new FormData();
        params.append('_pro_id', proId);
        params.append('_parent_id', parentComment);
        params.append('_content', value);
        let response;
        if (type === 'comment') {
            response = await commentsApi.add(params);
        } else {
            params.append('_star', star);
            response = await ratingApi.add(params);
        }
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
        setContent('');
        setStar(0);
        setLoadingAdd(false);
        if (fetchRating) {
            fetchRating();
        }
        if (fetchComments) {
            fetchComments();
        }
        if (handleShowFormLv2) {
            handleShowFormLv2();
        }
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <textarea
                placeholder="Nội dung tối thiểu 5 ký tự *"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {type === 'rating' && !handleShowFormLv2 && (
                <div className={clsx(styles.ratingStar)}>
                    <strong>Đánh giá của bạn : </strong>
                    {starArray.map((item) => (
                        <i
                            key={item}
                            className={clsx({ [styles.color]: item <= star }, 'fa fa-star')}
                            onClick={() => setStar(item)}
                        ></i>
                    ))}
                </div>
            )}
            <Button outline primary onClick={handleAddComment} loading={isLoadingAdd}>
                <i className="fa fa-paper-plane-o"></i>Gửi bình luận
            </Button>
        </div>
    );
}

export default Form;
