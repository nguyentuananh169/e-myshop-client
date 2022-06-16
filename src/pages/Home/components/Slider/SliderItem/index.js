import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './SliderItem.module.css';
const SliderItem = (props) => {
    return (
        <div className={clsx(styles.slider)}>
            <Link to={props.link}>
                <img style={{ width: `${props.widthSlider}px` }} src={props.img} alt="" />
            </Link>
        </div>
    );
};
export default SliderItem;
