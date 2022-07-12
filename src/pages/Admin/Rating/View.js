import clsx from 'clsx';
import Modal from '../components/Modal';
import CommentItem from '../../../components/CommentItem';
import styles from './Rating.module.css';
function View({ dataRating, isViewRating, handleViewRating, fetchRating, params }) {
    const handleSubmit = () => {
        handleViewRating();
        fetchRating(params.page, params.limit);
    };
    return (
        <Modal
            isOpen={isViewRating}
            outerClose
            overlay
            title="Xem chi tiết đánh giá"
            style={{ maxWidth: '900px' }}
            onClose={handleViewRating}
        >
            <div className={clsx(styles.listComment)}>
                <CommentItem data={dataRating} fetchRating={handleSubmit} type="rating" />
            </div>
        </Modal>
    );
}

export default View;
