import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Button.module.css';
function Button({
    children,
    text = false,
    noBorderRadius = false,
    outline = false,
    notBtn = false,
    primary = false,
    success = false,
    danger = false,
    warning = false,
    info = false,
    dark = false,
    large = false,
    small = false,
    fullWidth = false,
    href = false,
    to = false,
    loading = false,
    disabled = false,
    active = false,
    ...props
}) {
    let Tags = 'button';
    if (href && !loading && !disabled) {
        Tags = 'a';
        props.href = href;
    } else if (to && !loading && !disabled) {
        Tags = Link;
        props.to = to;
    }
    const classes = clsx(styles.wrapper, {
        [styles.text]: text,
        [styles.noBorderRadius]: noBorderRadius,
        [styles.notBtn]: notBtn,
        [styles.outline]: outline,
        [styles.primary]: primary,
        [styles.success]: success,
        [styles.danger]: danger,
        [styles.warning]: warning,
        [styles.info]: info,
        [styles.dark]: dark,
        [styles.large]: large,
        [styles.small]: small,
        [styles.fullWidth]: fullWidth,
        [styles.loading]: loading,
        [styles.active]: active,
        [styles.disabled]: disabled,
    });
    if (disabled || loading) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    return (
        <Tags className={classes} {...props}>
            {loading ? (
                <>
                    <i className="fa fa-spinner"></i>
                    {loading && typeof loading === 'string' ? loading : 'Loading...'}
                </>
            ) : (
                children
            )}
        </Tags>
    );
}

export default Button;
