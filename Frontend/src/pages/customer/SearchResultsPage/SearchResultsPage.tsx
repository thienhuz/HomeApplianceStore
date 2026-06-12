import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SidebarFilters from './components/SidebarFilters';
import ProductGrid from './components/ProductGrid';
import SortBar from './components/SortBar';
import Pagination from './components/Pagination';

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q') || '';

    return (
        <div className="max-w-container-max mx-auto px-margin-desktop w-full">
            <header className="mb-stack-lg">
                <h1 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">Kết quả tìm kiếm cho: "{q}"</h1>
                <p className="font-body-md text-body-md text-on-secondary-container">Found 12 products matching your request.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                <aside className="md:col-span-3">
                    <div className="sticky top-28">
                        <SidebarFilters />
                    </div>
                </aside>

                <section className="md:col-span-9">
                    <SortBar />
                    <ProductGrid />
                    <Pagination />
                </section>
            </div>
        </div>
    );
};

export default SearchResultsPage;
