import React from 'react';

const Pagination: React.FC = () => {
    return (
        <div className="mt-stack-lg flex items-center justify-center gap-2 py-10">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container-highest hover:bg-surface-container hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container-highest hover:bg-surface-container hover:text-primary transition-colors">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container-highest hover:bg-surface-container hover:text-primary transition-colors">3</button>
            <span className="px-2">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container-highest hover:bg-surface-container hover:text-primary transition-colors">8</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container-highest hover:bg-surface-container hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
            </button>
        </div>
    );
};

export default Pagination;
