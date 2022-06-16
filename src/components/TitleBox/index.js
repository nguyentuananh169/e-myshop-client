import clsx from 'clsx';
import styles from './TitleBox.module.css';
function TitleBox({ title }) {
    return (
        <div className={clsx(styles.container)}>
            <h2>{title}</h2>
        </div>
    );
}

export default TitleBox;
