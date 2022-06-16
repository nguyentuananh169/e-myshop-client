import { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Description.module.css';
function Description({ name, description }) {
    const [isMoreContent, setMoreContent] = useState(false);
    const bodyRef = useRef(null);
    const changeContent = () => {
        setMoreContent(!isMoreContent);
        if (isMoreContent) {
            const autoBack = setInterval(() => {
                document.documentElement.scrollTop -= 20;
                if (document.documentElement.scrollTop <= bodyRef.current.offsetTop) {
                    clearInterval(autoBack);
                }
            }, 1);
        }
    };
    return (
        <div className="container">
            <div className={clsx(styles.productContent)}>
                <h4>Mô tả sản phẩm {name}</h4>
                <div ref={bodyRef} className={clsx(styles.body, { [styles.more]: isMoreContent })}>
                    {description ? (
                        <div className={clsx(styles.content)}>
                            <div dangerouslySetInnerHTML={{ __html: description }}></div>
                        </div>
                    ) : (
                        <div className={clsx(styles.noContent)}>
                            <strong>Đang cập nhật nội dung....</strong>
                        </div>
                    )}
                </div>
                {description ? (
                    <div className={clsx(styles.bottom)}>
                        <button onClick={changeContent}>
                            <i className={`fa fa-caret-${isMoreContent ? 'up' : 'down'}`}></i>
                            {isMoreContent ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Description;
