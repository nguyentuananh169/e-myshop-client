import clsx from 'clsx';
import Content from './Content';
import Header from './Header';
import styles from './Right.module.css';
function Right({ collapse, handleSetShowMenuMobile, children }) {
    return (
        <div className={clsx(styles.wrapper, { [styles.collapseMenu]: collapse })}>
            <Header collapse={collapse} handleSetShowMenuMobile={handleSetShowMenuMobile} />
            <Content>{children}</Content>
        </div>
    );
}

export default Right;
