const addToastMessage = (randomId, type, title, message, duration) => {
    return {
        type: 'ADD_NEW_TOAST_MESSAGE',
        payload: {
            id: randomId,
            type: type,
            title: title,
            message: message,
            duration: duration,
        },
    };
};
export const addNewToastMessage = (
    type = 'dark',
    title,
    message,
    duration = 3000,
) => {
    const randomId = Math.floor(Math.random() * 10000 + 1000);
    return (dispatch) => {
        dispatch(addToastMessage(randomId, type, title, message, duration));
        setTimeout(() => {
            dispatch(removeToastMessage(randomId));
        }, duration + 300);
    };
};
export const removeToastMessage = (id) => {
    return {
        type: 'REMOVE_TOAST_MESSAGE',
        payload: id,
    };
};
