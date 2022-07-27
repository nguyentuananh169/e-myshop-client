import React, { useEffect, useState } from 'react';
import SliderItem from './SliderItem';
import clsx from 'clsx';
import Loading from './SliderItem/Loading';
import bannerHomeApi from '../../../../api/bannerHomeApi';
import styles from './Slider.module.css';
const Slider = () => {
    const [indexSlider, setIndexSlider] = useState(0);
    const [bannerList, setBannerList] = useState([]);
    const [widthSlider, setWidthSlider] = useState(0);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const autoSl = setInterval(() => {
            nextSlider();
        }, 7000);
        return () => {
            clearInterval(autoSl);
        };
    }, [indexSlider, bannerList]);
    useEffect(() => {
        handleSetWidthSlider();
        window.addEventListener('resize', handleSetWidthSlider);
        return () => window.removeEventListener('resize', handleSetWidthSlider);
    }, []);
    useEffect(() => {
        const getDataBanner = async () => {
            const response = await bannerHomeApi.getAll();
            setLoading(false);
            setBannerList(response.bannerList);
        };
        getDataBanner();
    }, []);
    const handleSetWidthSlider = () => {
        setWidthSlider(document.querySelector('.width-slider').clientWidth);
    };
    const nextSlider = () => {
        if (indexSlider >= bannerList.length - 1) {
            setIndexSlider(0);
        } else {
            setIndexSlider(indexSlider + 1);
        }
    };
    const prevSlider = () => {
        if (indexSlider <= 0) {
            setIndexSlider(bannerList.length - 1);
        } else {
            setIndexSlider(indexSlider - 1);
        }
    };
    const clickDotSlider = (index) => {
        setIndexSlider(index);
    };
    return (
        <div className="container">
            <div
                className={clsx(styles.sliderWrapper, 'width-slider')}
                style={{ height: `${widthSlider / 2.7}px` }}
            >
                <div
                    className={clsx(styles.listSlider)}
                    style={{
                        transform: `translateX(-${widthSlider * indexSlider}px)`,
                    }}
                >
                    {isLoading ? (
                        <Loading widthSlider={widthSlider} />
                    ) : (
                        bannerList.map((item) => (
                            <SliderItem
                                key={item.bh_id}
                                img={item.baseURLImg + item.bh_img}
                                widthSlider={widthSlider}
                                link={item.bh_link}
                            />
                        ))
                    )}
                </div>
                <button
                    type="button"
                    className={clsx('btnSlider', styles.prevBanner)}
                    onClick={prevSlider}
                >
                    &lsaquo;
                </button>
                <button
                    type="button"
                    className={clsx('btnSlider', styles.nextBanner)}
                    onClick={nextSlider}
                >
                    &rsaquo;
                </button>
                <div className={clsx(styles.dots)}>
                    {bannerList.map((item, key) => (
                        <span
                            key={key}
                            className={clsx({
                                [styles.active]: indexSlider === key,
                            })}
                            onClick={() => {
                                clickDotSlider(key);
                            }}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Slider;
