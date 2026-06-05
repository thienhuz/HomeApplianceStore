import React from 'react';
import Breadcrumb from './components/Breadcrumb';
import SidebarFilters from './components/SidebarFilters';
import SortBar from './components/SortBar';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';

const CategoryPage: React.FC = () => {
    return (
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-screen">
            <Breadcrumb />
            <div className="flex flex-col md:flex-row gap-gutter">
                <SidebarFilters />
                <div className="flex-1">
                    <SortBar />
                    <ProductGrid />
                    <Pagination />
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
