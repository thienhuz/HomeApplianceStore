import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const MainLayout: React.FC = () => {
    return (
        <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
            <ScrollToTop />
            <TopNavBar />
            
            {/* Main Content Padding */}
            <main className="pt-28 pb-16 flex-1">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default MainLayout;
