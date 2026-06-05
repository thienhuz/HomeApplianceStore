import React from 'react';

const Pagination: React.FC = () => {
    return (
        <div className="mt-16 flex justify-center items-center gap-stack-sm">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline/20 text-secondary hover:border-primary hover:text-primary transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-md">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline/20 text-on-surface hover:border-primary hover:text-primary transition-all font-label-md">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline/20 text-on-surface hover:border-primary hover:text-primary transition-all font-label-md">3</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline/20 text-secondary hover:border-primary hover:text-primary transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
            </button>
        </div>
    );
};

export default Pagination;
