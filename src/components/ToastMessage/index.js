import { useSelector, useDispatch } from 'react-redux';
import './ToastMessage.css';
import Item from './Item';
import { removeToastMessage } from '../../redux/actions/toastMessage';
function ToastMessage() {
    const toastMessageList = useSelector((state) => state.toastMessage);
    const dispatch = useDispatch();
    const handleRemoveMessage = (id) => {
        dispatch(removeToastMessage(id));
    };
    return (
        <div id="toast">
            {toastMessageList.map((item) => (
                <Item
                    key={item.id}
                    id={item.id}
                    type={item.type}
                    title={item.title}
                    message={item.message}
                    duration={item.duration}
                    handleRemoveMessage={handleRemoveMessage}
                />
            ))}
        </div>
    );
}

export default ToastMessage;
