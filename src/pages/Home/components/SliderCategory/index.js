import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import SliderItem from './SliderItem';
import LoadingBox from '../../../../components/LoadingBox';
import styles from './SliderCategory.module.css';
import TitleBox from '../../../../components/TitleBox';
function SliderCategory() {
    const categoryList = useSelector((state) => state.categoryProduct.dataCate);
    const categoryLength = useSelector((state) => state.categoryProduct.dataCate.length);
    const isLoading = useSelector((state) => state.categoryProduct.isLoading);
    // số lượng danh mục trên 1 slider
    const [number, setNumber] = useState(6);
    const [indexSlider, setIndexSlider] = useState(0);
    const [maxIndexSlider, setMaxIndexSlider] = useState(0);
    const elementRef = useRef(0);
    useEffect(() => {
        const changeNumber = () => {
            let widthBrowser = window.innerWidth;
            if (widthBrowser > 1024) {
                setMaxIndexSlider(categoryLength - 6 > 0 ? categoryLength - 6 : 0);
                setNumber(6);
            } else if (widthBrowser > 768 && widthBrowser <= 1024) {
                setMaxIndexSlider(categoryLength - 5 > 0 ? categoryLength - 5 : 0);
                setNumber(5);
            } else if (widthBrowser > 500 && widthBrowser <= 768) {
                setMaxIndexSlider(categoryLength - 4 > 0 ? categoryLength - 4 : 0);
                setNumber(4);
            } else if (widthBrowser <= 500) {
                setMaxIndexSlider(categoryLength - 3 > 0 ? categoryLength - 3 : 0);
                setNumber(3);
            }
        };
        changeNumber();
        window.addEventListener('resize', changeNumber);
        return () => {
            window.removeEventListener('resize', changeNumber);
        };
    }, [categoryLength]);
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
    return (
        <div className="container">
            <TitleBox title="Danh mục sản phẩm" />
            <div ref={elementRef} className={clsx(styles.containerListCategory)}>
                {isLoading ? (
                    <LoadingBox />
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={prevSlider}
                            className={clsx('btnSlider', styles.prevCategory)}
                        >
                            &lsaquo;
                        </button>
                        <button
                            type="button"
                            onClick={nextSlider}
                            className={clsx('btnSlider', styles.nextCategory)}
                        >
                            &rsaquo;
                        </button>
                        <div
                            className={clsx(styles.listCategory)}
                            style={{
                                width: `${
                                    (elementRef.current.clientWidth / number) * categoryLength
                                }px`,
                                transform: `translateX(-${
                                    (elementRef.current.clientWidth / number) * indexSlider
                                }px)`,
                            }}
                        >
                            {categoryList.map((item) => (
                                <SliderItem
                                    key={item.id}
                                    item={item}
                                    width={elementRef.current.clientWidth / number}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SliderCategory;
