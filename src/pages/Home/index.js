import Slider from './components/Slider';
import Products from './components/Products';
import SliderCategory from './components/SliderCategory';
import BlogList from './components/BlogList';
import TopReviews from './components/TopReviews';
import Subscript from './components/Subscript';
import WarrantyPolicy from './components/WarrantyPolicy';
function Home() {
    return (
        <>
            <Slider />
            <SliderCategory />
            <Products />
            <BlogList />
            <TopReviews />
            <Subscript />
            <WarrantyPolicy />
        </>
    );
}

export default Home;
