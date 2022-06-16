import clsx from 'clsx';
import { useEffect } from 'react';
import { useState } from 'react';
import brandProductApi from '../../../../../api/brandProductApi';
import Button from '../../../../../components/Button';
import styles from './FilterBox.module.css';
function FilterBox({
    fetchProductList,
    categoryId,
    filter,
    sort,
    handleChangeSort,
    handleSetFilter,
}) {
    const [isShowForm, setShowForm] = useState(false);
    const [listBrand, setListBrand] = useState([]);
    useEffect(() => {
        if (categoryId) {
            const fetchBrand = async () => {
                const response = await brandProductApi.getCateId(categoryId);
                setListBrand(response.dataBrand);
            };
            fetchBrand();
        }
    }, [categoryId]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowForm(!isShowForm);
        fetchProductList({ ...filter, ...sort });
    };
    return (
        <div className={clsx(styles.filterBox)}>
            <div className={clsx(styles.filter)}>
                <div
                    onClick={() => setShowForm(!isShowForm)}
                    className={clsx('overlay', 'c-pointer', { active: isShowForm })}
                ></div>
                <Button dark outline onClick={() => setShowForm(!isShowForm)}>
                    <i className="fa fa-filter"></i>Bộ lọc
                </Button>
                <div className={clsx(styles.filterForm, { [styles.show]: isShowForm })}>
                    <div className={clsx(styles.heading)}>
                        <h4>
                            <i className="fa fa-filter"></i> Bộ Lọc
                        </h4>
                        <button onClick={() => setShowForm(!isShowForm)}>
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                    <div className={clsx(styles.body)}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className={clsx(styles.formGroup)}>
                                <label>Thương hiệu</label>
                                <select
                                    onChange={(e) =>
                                        handleSetFilter({
                                            ...filter,
                                            brand: e.target.options[e.target.options.selectedIndex]
                                                .value,
                                        })
                                    }
                                >
                                    <option value="">Chọn thương hiệu</option>
                                    {listBrand.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={clsx(styles.formGroup)}>
                                <label>Chọn giá</label>
                                <select
                                    onChange={(e) =>
                                        handleSetFilter({
                                            ...filter,
                                            price: e.target.options[e.target.options.selectedIndex]
                                                .value,
                                        })
                                    }
                                >
                                    <option value="">Tất cả</option>
                                    <option value="1">Dưới 1 triệu</option>
                                    <option value="2">Từ 1 triệu - 5 triệu</option>
                                    <option value="3">Từ 5 triệu - 10 triệu</option>
                                    <option value="4">Từ 10 triệu - 15 triệu</option>
                                    <option value="5">Trên 15 triệu</option>
                                </select>
                            </div>
                            <div className={clsx(styles.formGroup)}>
                                <label>Chọn trạng thái</label>
                                <select
                                    onChange={(e) =>
                                        handleSetFilter({
                                            ...filter,
                                            status: e.target.options[e.target.options.selectedIndex]
                                                .value,
                                        })
                                    }
                                >
                                    <option value="">Tất cả</option>
                                    <option value="1">Mới nhất</option>
                                    <option value="2">Nổi bật</option>
                                </select>
                            </div>
                            <div className={clsx(styles.formGroup)}>
                                <label>Đang khuyến mãi</label>
                                <select
                                    onChange={(e) =>
                                        handleSetFilter({
                                            ...filter,
                                            sale: e.target.options[e.target.options.selectedIndex]
                                                .value,
                                        })
                                    }
                                >
                                    <option value="">Tất cả</option>
                                    <option value="1">Có</option>
                                    <option value="0">không</option>
                                </select>
                            </div>
                            <div className={clsx(styles.formGroup)}>
                                <Button fullWidth outline dark noBorderRadius>
                                    LỌC NGAY
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.sortBy)}>
                <select
                    onChange={(e) =>
                        handleChangeSort(e.target.options[e.target.options.selectedIndex].dataset)
                    }
                >
                    <option data-by="" data-dir="">
                        Chọn sắp xếp
                    </option>
                    <option data-by="pro_price" data-dir="ASC">
                        Giá từ thấp đến cao
                    </option>
                    <option data-by="pro_price" data-dir="DESC">
                        Giá từ cao đến thấp
                    </option>
                    <option data-by="pro_name" data-dir="ASC">
                        Tên từ A-Z
                    </option>
                    <option data-by="pro_name" data-dir="DESC">
                        Tên từ Z-A
                    </option>
                </select>
            </div>
        </div>
    );
}

export default FilterBox;
