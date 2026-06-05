import React from 'react';
import HeroBanner from './components/HeroBanner';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import PromotionalBanner from './components/PromotionalBanner';

const HomePage: React.FC = () => {
    return (
        <>
            <HeroBanner />
            <Categories />
            <FeaturedProducts />
            <PromotionalBanner />
        </>
    );
};

export default HomePage;
