import { useSelector } from 'react-redux';
import ProductList from '../ProductList';
const Products = () => {
    const allCategory = useSelector((state) => state.categoryProduct.dataCate);
    const categoryActive = allCategory.filter((item) => item.status === '0');
    return (
        <>
            {categoryActive?.map((item) => (
                <ProductList key={item.id} categoryId={item.id} categoryName={item.name} />
            ))}
        </>
    );
};

export default Products;
