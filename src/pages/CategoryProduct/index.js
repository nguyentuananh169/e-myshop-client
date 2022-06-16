import { useParams } from 'react-router';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import categoryProductApi from '../../api/categoryProductApi';
import Path from '../../components/Path';
import WarrantyPolicy from '../Home/components/WarrantyPolicy';
import ListProduct from '../Home/components/ProductList';
function CategoryProduct() {
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('...');
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            setCategoryId(id);
            const fetchCategoryProduct = async () => {
                const response = await categoryProductApi.getById(id);

                setCategoryName(response[0].name);
            };
            fetchCategoryProduct();
        }
    }, [id]);
    const path = [
        {
            name: categoryName,
            url: '#',
        },
    ];
    return (
        <>
            <Path path={path} />
            <div className="container">
                <ListProduct
                    categoryId={categoryId}
                    categoryName={categoryName}
                    search
                    pagination
                />
                <WarrantyPolicy />
            </div>
        </>
    );
}

export default CategoryProduct;
