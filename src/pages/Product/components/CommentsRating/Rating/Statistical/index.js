import clsx from 'clsx';
import LineItem from './LineItem';
import styles from './Statistical.module.css';
function Statistical({ rating }) {
    let ptStar1 = ((rating.star1 / rating.totalRating) * 100).toFixed(1);
    let ptStar2 = ((rating.star2 / rating.totalRating) * 100).toFixed(1);
    let ptStar3 = ((rating.star3 / rating.totalRating) * 100).toFixed(1);
    let ptStar4 = ((rating.star4 / rating.totalRating) * 100).toFixed(1);
    let ptStar5 = ((rating.star5 / rating.totalRating) * 100).toFixed(1);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.starRating)}>
                <strong>Đánh giá trung bình</strong>
                <p className={clsx(styles.rating)}>
                    {rating.rating}
                    <i className="fa fa-star"></i>/ 5
                </p>
                <p>{rating.totalRating} lượt đánh giá</p>
            </div>
            <div className={clsx(styles.starLine)}>
                <LineItem ptStar={ptStar1} number="1" />
                <LineItem ptStar={ptStar2} number="2" />
                <LineItem ptStar={ptStar3} number="3" />
                <LineItem ptStar={ptStar4} number="4" />
                <LineItem ptStar={ptStar5} number="5" />
            </div>
            <div className={clsx(styles.countRating)}>
                <p>{rating.star1} đánh giá</p>
                <p>{rating.star2} đánh giá</p>
                <p>{rating.star3} đánh giá</p>
                <p>{rating.star4} đánh giá</p>
                <p>{rating.star5} đánh giá</p>
            </div>
        </div>
    );
}

export default Statistical;
