import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Path from '../../components/Path';
import productApi from '../../api/productApi';
import MainInfo from './components/MainInfo';
import Description from './components/Description';
import Related from './components/Related';
import CommentsRating from './components/CommentsRating';
import LoadingMainInfo from './components/MainInfo/Loading';
function Product() {
    let { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [dataProduct, setDataProduct] = useState({});
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const response = await productApi.getById(id);
            setLoading(false);
            setDataProduct(response.dataProduct[0]);
        };
        fetchProduct();
    }, [id]);
    const path = [
        {
            name: dataProduct.cate_pro_name,
            url: `/danh-muc-san-pham/${dataProduct.cate_pro_id}`,
        },
        {
            name: dataProduct.pro_name,
            url: `/product/${dataProduct.pro_id}`,
        },
    ];
    return (
        <>
            <Path path={path} />
            {isLoading ? (
                <LoadingMainInfo />
            ) : (
                <>
                    <MainInfo data={dataProduct} />
                    <Description description={dataProduct.pro_des} name={dataProduct.pro_name} />
                    <Related categoryId={dataProduct.cate_pro_id} />
                    <CommentsRating name={dataProduct.pro_name} id={dataProduct.pro_id} />
                </>
            )}
        </>
    );
}

export default Product;
