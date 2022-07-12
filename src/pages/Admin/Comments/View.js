import clsx from 'clsx';
import Modal from '../components/Modal';
import CommentItem from '../../../components/CommentItem';
import styles from './Comments.module.css';
function View({ dataComments, isViewComments, handleViewComments, fetchComments, params }) {
    const handleSubmit = () => {
        handleViewComments();
        fetchComments(params.page, params.limit);
    };
    return (
        <Modal
            isOpen={isViewComments}
            outerClose
            overlay
            title="Xem chi tiết bình luận"
            style={{ maxWidth: '900px' }}
            onClose={handleViewComments}
        >
            <div className={clsx(styles.listComment)}>
                <CommentItem data={dataComments} fetchComments={handleSubmit} type="comment" />
            </div>
        </Modal>
    );
}

export default View;
