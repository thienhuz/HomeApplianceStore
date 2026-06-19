import React from 'react';

interface PaginationProps {
    totalPages: number;
    pageNumber: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, pageNumber, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages: React.ReactNode[] = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= pageNumber - 1 && i <= pageNumber + 1)) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                        pageNumber === i
                            ? 'bg-primary text-white'
                            : 'border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                >
                    {i}
                </button>
            );
        } else if (i === pageNumber - 2 || i === pageNumber + 2) {
            pages.push(<span key={i} className="px-1 text-slate-400">...</span>);
        }
    }

    return (
        <div className="mt-8 flex items-center justify-center gap-2 py-8">
            <button
                onClick={() => onPageChange(Math.max(1, pageNumber - 1))}
                disabled={pageNumber === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            {pages}
            <button
                onClick={() => onPageChange(Math.min(totalPages, pageNumber + 1))}
                disabled={pageNumber === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
        </div>
    );
};

export default Pagination;
