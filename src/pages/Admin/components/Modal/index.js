import clsx from 'clsx';
import styles from './Modal.module.css';
function Modal({
    isOpen,
    title,
    outerClose,
    onClose,
    overlay,
    animation = 'topToBottom',
    style = {},
    children,
}) {
    return (
        <>
            {overlay && (
                <div
                    style={{ zIndex: 998 }}
                    className={clsx('overlay', {
                        active: isOpen,
                        'c-pointer': outerClose,
                    })}
                    onClick={onClose}
                ></div>
            )}
            <div
                className={clsx(styles.wrapper, styles[animation], { [styles.open]: isOpen })}
                style={style}
            >
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.heading)}>
                        <h4>{title}</h4>
                        <i className="fa fa-times" onClick={onClose}></i>
                    </div>
                    <div className={clsx(styles.body, 'custom-scrollbars')}>{children}</div>
                </div>
            </div>
        </>
    );
}
export default Modal;
