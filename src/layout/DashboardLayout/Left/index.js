import clsx from 'clsx';
import Header from './Header';
import Main from './Main';
import styles from './Left.module.css';
function Left({ handleSetShowMenu, isShowMenu }) {
    return (
        <>
            <div
                className={clsx('overlay', 'c-pointer', { active: isShowMenu })}
                onClick={handleSetShowMenu}
            ></div>
            <div className={clsx(styles.wrapper, { [styles.active]: isShowMenu })}>
                <div className={clsx(styles.closeMenu)} onClick={handleSetShowMenu}>
                    <i className="fa fa-times"></i>
                </div>
                <Header />
                <Main handleSetShowMenu={handleSetShowMenu} />
            </div>
        </>
    );
}

export default Left;
