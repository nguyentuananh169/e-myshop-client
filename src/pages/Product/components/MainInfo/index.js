import clsx from 'clsx';
import Img from './Img';
import Info from './Info';
import styles from './MainInfo.module.css';
function MainInfo({ data }) {
    return (
        <div className="container">
            <div className={clsx(styles.nameProduct)}>
                <h4>{data.pro_name}</h4>
            </div>
            <div className={clsx(styles.productDetail)}>
                <Img
                    pro_imgs={data.pro_imgs}
                    pro_id={data.pro_id}
                    baseURLImg={data.baseURLImg}
                    pro_img={data.pro_img}
                    pro_heart={data.pro_heart}
                />
                <Info
                    id={data.pro_id}
                    name={data.pro_name}
                    price={data.pro_price}
                    cost={data.pro_cost}
                    sale={data.pro_sale}
                    promotion={data.pro_promotion}
                    attr={data.pro_attr}
                    amount={data.pro_qty}
                    UrlImg={`${data.baseURLImg}/${data.pro_img}`}
                />
            </div>
        </div>
    );
}

export default MainInfo;
