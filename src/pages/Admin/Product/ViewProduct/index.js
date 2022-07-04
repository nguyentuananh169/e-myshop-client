import Modal from '../../components/Modal';
import AttributeInfo from './AttributeInfo';
import DescriptionInfo from './DescriptionInfo';
import MainInfo from './MainInfo';
import PromotionInfo from './PromotionInfo';
function ViewProduct({ dataView, isShowForm, handleShowForm, handleUpdateStatus }) {
    const elementTitle = (
        <>
            Xem sản phẩm <span style={{ color: '#2eb85c' }}>{dataView.pro_name}</span>
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
            <MainInfo data={dataView} handleUpdateStatus={handleUpdateStatus} />
            <AttributeInfo proAttr={dataView.pro_attr} />
            <PromotionInfo proPromotion={dataView.pro_promotion} />
            <DescriptionInfo proDes={dataView.pro_des} />
        </Modal>
    );
}

export default ViewProduct;
