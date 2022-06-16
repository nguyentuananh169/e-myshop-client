import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './CommentsRating.module.css';
import Comments from './Comments';
import Rating from './Rating';
function CommentsRating({ name, id }) {
    const [isActive, setIsActive] = useState(true);
    const buttonRef = useRef(null);
    const changeStatus = (status) => {
        setIsActive(status);
    };
    return (
        <div className="container">
            <div className={clsx(styles.commentsRating)}>
                <div className={clsx(styles.heading)}>
                    <button
                        onClick={() => changeStatus(true)}
                        className={clsx(styles.fromComment, { [styles.active]: isActive })}
                    >
                        Bình luận
                    </button>
                    <button
                        ref={buttonRef}
                        onClick={() => changeStatus(false)}
                        className={clsx(styles.fromReviews, { [styles.active]: !isActive })}
                    >
                        Đánh giá
                    </button>
                    <div
                        className={clsx(styles.line)}
                        style={{
                            width: `${buttonRef.current?.offsetWidth}px`,
                            left: `${isActive ? 0 : buttonRef.current?.offsetLeft}px`,
                        }}
                    ></div>
                </div>
                <Comments proId={id} proName={name} active={isActive} />
                <Rating proId={id} proName={name} active={!isActive} />
            </div>
        </div>
    );
}

export default CommentsRating;
