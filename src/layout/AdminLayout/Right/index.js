import clsx from 'clsx';
import Header from './Header';
import styles from './Right.module.css';
function Right({ collapse, handleSetShowMenuMobile }) {
    return (
        <div className={clsx(styles.wrapper, { [styles.collapseMenu]: collapse })}>
            {/* <button onClick={handleSetShowMenuMobile}>next</button> */}
            <Header />
        </div>
    );
}

export default Right;
