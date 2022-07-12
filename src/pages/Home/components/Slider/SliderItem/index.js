import React from 'react';
import clsx from 'clsx';
import styles from './SliderItem.module.css';
const SliderItem = (props) => {
    return (
        <div className={clsx(styles.slider)}>
            <a href={props.link} target="_blank">
                <img style={{ width: `${props.widthSlider}px` }} src={props.img} alt="" />
            </a>
        </div>
    );
};
export default SliderItem;
