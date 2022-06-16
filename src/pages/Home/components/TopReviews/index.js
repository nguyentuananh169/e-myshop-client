import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import TopReviewsItem from './TopReviewsItem';
import Loading from './TopReviewsItem/Loading';
import ratingApi from '../../../../api/ratingApi';
import styles from './TopReviews.module.css';
function TopReviews() {
    const [isLoading, setLoading] = useState(true);
    const [widthTopReviewsItem, setWidthTopReviewsItem] = useState(0);
    const [widthListTopReviews, setWidthListTopReviews] = useState(0);
    const [indexSlider, setIndexSlider] = useState(0);
    const [maxIndexSlider, setMaxIndexSlider] = useState(0);
    const [reviewsList, setReviewsList] = useState([]);
    // số lượng bài đánh giá trên 1 slider
    const [number, setNumber] = useState(3);
    const elementRef = useRef(null);
    useEffect(() => {
        const fetchReviews = async () => {
            const response = await ratingApi.showByStatus('1');
            setReviewsList(response);
            setLoading(false);
        };
        fetchReviews();
    }, []);
    useEffect(() => {
        setWidthTopReviewsItem(elementRef.current.clientWidth / number);
        setWidthListTopReviews(widthTopReviewsItem * reviewsList.length);
        // const autoSlider = setInterval(() => {
        //     nextSlider();
        // }, 7000);
        // return () => {
        //     clearInterval(autoSlider);
        // };
    }, [indexSlider, widthTopReviewsItem, widthListTopReviews, reviewsList, number]);
    useEffect(() => {
        const changeNumber = () => {
            let widthBrowser = window.innerWidth;
            if (widthBrowser > 1024) {
                setMaxIndexSlider(reviewsList.length - 3 > 0 ? reviewsList.length - 3 : 0);
                setNumber(3);
            } else if (widthBrowser > 700 && widthBrowser <= 1024) {
                setMaxIndexSlider(reviewsList.length - 2 > 0 ? reviewsList.length - 2 : 0);
                setNumber(2);
            } else if (widthBrowser <= 700) {
                setMaxIndexSlider(reviewsList.length - 1 > 0 ? reviewsList.length - 1 : 0);
                setNumber(1);
            }
        };
        changeNumber();
        window.addEventListener('resize', changeNumber);
        return () => {
            window.removeEventListener('resize', changeNumber);
        };
    }, [reviewsList]);
    const nextSlider = () => {
        if (indexSlider >= maxIndexSlider) {
            setIndexSlider(0);
        } else {
            setIndexSlider(indexSlider + 1);
        }
    };
    const prevSlider = () => {
        if (indexSlider <= 0) {
            setIndexSlider(maxIndexSlider);
        } else {
            setIndexSlider(indexSlider - 1);
        }
    };
    const clickDots = (index) => {
        setIndexSlider(index);
    };
    return (
        <div className={clsx(styles.bgImg)}>
            <div className="container">
                <div className={clsx(styles.topReviewsTitle)}>
                    <h2>Bài đánh giá hàng đầu</h2>
                </div>
                <div ref={elementRef} className={clsx(styles.containerListTopReviews)}>
                    <button
                        type="button"
                        onClick={prevSlider}
                        className={clsx('btnSlider', styles.prevTopReviews)}
                    >
                        &lsaquo;
                    </button>
                    <button
                        type="button"
                        onClick={nextSlider}
                        className={clsx('btnSlider', styles.nextTopReviews)}
                    >
                        &rsaquo;
                    </button>
                    <div
                        className={clsx(styles.listTopReviews)}
                        style={{
                            width: `${widthListTopReviews}px`,
                            transform: `translateX(-${widthTopReviewsItem * indexSlider}px)`,
                        }}
                    >
                        {isLoading ? (
                            <Loading count={3} width={widthTopReviewsItem} />
                        ) : (
                            reviewsList.map((item) => (
                                <TopReviewsItem
                                    key={item.r_id}
                                    item={item}
                                    width={widthTopReviewsItem}
                                />
                            ))
                        )}
                    </div>
                </div>

                <div className={clsx(styles.topReviewsDots)}>
                    {reviewsList
                        .filter((item, index) => index <= maxIndexSlider)
                        .map((item, index) => (
                            <span
                                key={index}
                                className={clsx({
                                    [styles.active]: indexSlider === index,
                                })}
                                onClick={() => clickDots(index)}
                            ></span>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default TopReviews;
