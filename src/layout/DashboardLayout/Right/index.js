import clsx from 'clsx';
import styles from './Right.module.css';

import Header from './Header';
function Right({ handleSetShowMenu, children }) {
    return (
        <>
            <Header handleSetShowMenu={handleSetShowMenu} />
            <div className={clsx(styles.wrapper)}>{children}</div>
        </>
    );
}

export default Right;
