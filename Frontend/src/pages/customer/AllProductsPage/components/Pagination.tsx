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
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                        pageNumber === i
                            ? 'bg-primary text-white font-bold'
                            : 'border border-surface-container-highest hover:bg-surface-container hover:text-primary'
                    }`}
                >
                    {i}
                </button>
            );
        } else if (i === pageNumber - 2 || i === pageNumber + 2) {
            pages.push(<span key={i} className="px-2">...</span>);
        }
    }

    return (
        <div className="mt-stack-lg flex items-center justify-center gap-2 py-10">
            <button
                onClick={() => onPageChange(Math.max(1, pageNumber - 1))}
                disabled={pageNumber === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container-highest hover:bg-surface-container hover:text-primary transition-colors disabled:opacity-50"
            >
                <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {pages}
            <button
                onClick={() => onPageChange(Math.min(totalPages, pageNumber + 1))}
                disabled={pageNumber === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container-highest hover:bg-surface-container hover:text-primary transition-colors disabled:opacity-50"
            >
                <span className="material-symbols-outlined">chevron_right</span>
            </button>
        </div>
    );
};

export default Pagination;
