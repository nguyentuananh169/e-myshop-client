import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import wishListApi from '../../../../../api/wishListApi';
import styles from './Img.module.css';
import { addNewToastMessage } from '../../../../../redux/actions/toastMessage';
function Img(props) {
    const [widthImgPreview, setWidthImgPreview] = useState(0);
    const [widthImg, setWidthImg] = useState(0);
    const [indexImg, setIndexImg] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const imgs = props.pro_imgs ? JSON.parse(props.pro_imgs) : [];
    imgs.unshift(props.pro_img);
    let maxIndexImg2 = indexImg - 3;
    const dispatch = useDispatch();
    useEffect(() => {
        setWidthImgPreview(document.querySelector('.widthImgPreview').clientWidth);
        setWidthImg(document.querySelector('.widthImg').clientWidth);
    }, []);
    useEffect(() => {
        const autoSL = setInterval(() => {
            nextSlider();
        }, 5000);
        return () => {
            clearInterval(autoSL);
        };
    }, [indexImg, imgs]);
    useEffect(() => {
        setIndexImg(0);
    }, [props.pro_id]);
    const nextSlider = () => {
        if (indexImg >= imgs.length - 1) {
            setIndexImg(0);
        } else {
            setIndexImg(indexImg + 1);
        }
    };
    const prevSlider = () => {
        if (indexImg <= 0) {
            setIndexImg(imgs.length - 1);
        } else {
            setIndexImg(indexImg - 1);
        }
    };
    const clickImg = (index) => {
        setIndexImg(index);
    };
    const handleWish = async () => {
        if (isLoading) {
            return dispatch(
                addNewToastMessage(
                    'warning',
                    'Chưa được xử lý',
                    'Lần thay đổi trước chưa có kết quả. Vui lòng đợi',
                    7000,
                ),
            );
        }
        setLoading(true);
        const response = await wishListApi.wish(props.pro_id);
        setLoading(false);
        if (response[0].error === 1) {
            return dispatch(addNewToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(addNewToastMessage('success', 'Thành công', response[0].message));
    };
    return (
        <div className={clsx(styles.productDetailImg)}>
            <div className={clsx(styles.imgPreviewContainer, 'widthImgPreview')}>
                <button
                    className={clsx(styles.wishProduct, { [styles.loading]: isLoading })}
                    onClick={handleWish}
                >
                    <i className="fa fa-heart"></i>
                </button>
                <button onClick={prevSlider} className={clsx(styles.prev, styles.btnImgPreview)}>
                    <i className="fa fa-caret-left"></i>
                </button>
                <button onClick={nextSlider} className={clsx(styles.next, styles.btnImgPreview)}>
                    <i className="fa fa-caret-right"></i>
                </button>
                <div
                    className={clsx(styles.listImgPreview)}
                    style={{
                        width: `${widthImgPreview * imgs.length}px`,
                        transform: `translate(-${widthImgPreview * indexImg}px)`,
                    }}
                >
                    {imgs.map((item, index) => (
                        <div key={index} className={clsx(styles.imgItem)}>
                            <img src={item ? `${props.baseURLImg}${item}` : null} alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className={clsx(styles.listImg)}>
                <div className={clsx(styles.prevSliderImg)}>
                    <button onClick={prevSlider} className={clsx(styles.btnSliderImg, styles.prev)}>
                        <i className="fa fa-caret-left"></i>
                    </button>
                </div>
                <div className={clsx(styles.listImgProductContainer, 'widthImg')}>
                    <div
                        className={clsx(styles.listImgProduct)}
                        style={{
                            width: `${(widthImg / 4) * imgs.length}px`,
                            transform: `translate(-${
                                (widthImg / 4) * (maxIndexImg2 <= 0 ? 0 : maxIndexImg2)
                            }px)`,
                        }}
                    >
                        {imgs.map((item, index) => (
                            <div
                                onClick={() => clickImg(index)}
                                key={index}
                                className={clsx(styles.imgProductItem, {
                                    [styles.active]: index === indexImg,
                                })}
                                style={{
                                    width: `${widthImg / 4}px`,
                                }}
                            >
                                <img src={item ? `${props.baseURLImg}${item}` : null} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={clsx(styles.nextSliderImg)}>
                    <button onClick={nextSlider} className={clsx(styles.btnSliderImg, styles.next)}>
                        <i className="fa fa-caret-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Img;
