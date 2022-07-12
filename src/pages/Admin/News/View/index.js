import clsx from 'clsx';
import styles from './View.module.css';
import Modal from '../../components/Modal';
import NewsContent from '../../../../components/NewsContent';
import { useEffect } from 'react';
function View({ dataView, isShowForm, handleShowForm }) {
    const elementTitle = (
        <>
            Xem tin tức <span style={{ color: '#2eb85c' }}>{dataView.news_title}</span>
        </>
    );
    return (
        <Modal
            isOpen={isShowForm}
            outerClose
            overlay
            title={elementTitle}
            style={{ maxWidth: '900px' }}
            onClose={handleShowForm}
        >
            <div className={clsx(styles.wrapper)}>
                <NewsContent item={dataView} />
            </div>
        </Modal>
    );
}

export default View;
