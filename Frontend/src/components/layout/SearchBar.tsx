import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../../services/productApi';
import type { SearchSuggestion } from '../../types';

const EMPTY: SearchSuggestion = { suggestions: [], products: [] };

const SearchBar: React.FC = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [data, setData] = useState<SearchSuggestion>(EMPTY);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const reqId = useRef(0);

    // Gọi API gợi ý sau khi gõ ngừng 300ms (debounce); bỏ qua kết quả cũ.
    useEffect(() => {
        const keyword = query.trim();
        if (keyword.length < 2) {
            setData(EMPTY);
            setLoading(false);
            return;
        }

        setLoading(true);
        const id = ++reqId.current;
        const timer = setTimeout(async () => {
            try {
                const result = await productApi.getSearchSuggestions(keyword, 5);
                if (id === reqId.current) setData(result);
            } catch {
                if (id === reqId.current) setData(EMPTY);
            } finally {
                if (id === reqId.current) setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Đóng dropdown khi bấm ra ngoài.
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const goSearch = (keyword: string) => {
        const k = keyword.trim();
        setOpen(false);
        // Ô trống → hiển thị tất cả sản phẩm; có từ khóa → lọc theo từ khóa.
        navigate(k ? `/products?keyword=${encodeURIComponent(k)}` : '/products');
    };

    const hasResults = data.suggestions.length > 0 || data.products.length > 0;
    const showDropdown = open && query.trim().length >= 2;

    return (
        <div ref={containerRef} className="relative w-full">
            <form
                className="flex items-center overflow-hidden rounded-full border border-surface-variant bg-surface-bright shadow-sm transition-colors focus-within:border-primary"
                onSubmit={(e) => {
                    e.preventDefault();
                    goSearch(query);
                }}
            >
                <button type="submit" className="flex cursor-pointer items-center justify-center pl-4 pr-2 text-primary transition-colors hover:text-primary/80" aria-label="Tìm kiếm">
                    <span className="material-symbols-outlined">search</span>
                </button>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setOpen(true)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="min-w-0 flex-1 border-none bg-transparent py-2.5 pr-2 text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant"
                    type="text"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery('');
                            setData(EMPTY);
                        }}
                        className="px-3 text-on-surface-variant transition-colors hover:text-primary"
                        aria-label="Xóa"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                )}
            </form>

            {showDropdown && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-surface-variant/40 bg-surface-container-lowest shadow-2xl">
                    {loading && !hasResults ? (
                        <div className="space-y-2 p-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-6 animate-pulse rounded bg-surface-container" />
                            ))}
                        </div>
                    ) : !hasResults ? (
                        <p className="p-5 text-center font-body-sm text-body-sm text-on-surface-variant">
                            Không tìm thấy kết quả cho "{query}"
                        </p>
                    ) : (
                        <div className="max-h-[70vh] overflow-y-auto">
                            {data.suggestions.length > 0 && (
                                <div className="py-2">
                                    <p className="px-4 py-1 font-label-sm text-label-sm text-on-surface-variant">Có phải bạn muốn tìm</p>
                                    {data.suggestions.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => goSearch(s)}
                                            className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-primary/5"
                                        >
                                            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
                                            <span className="font-body-md text-body-md text-primary">{s}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {data.products.length > 0 && (
                                <div className="border-t border-surface-variant/40 py-2">
                                    <p className="px-4 py-1 font-label-sm text-label-sm text-on-surface-variant">Sản phẩm gợi ý</p>
                                    {data.products.map((p) => (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => {
                                                setOpen(false);
                                                navigate(`/DetailProduct/${p.id}`);
                                            }}
                                            className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-primary/5"
                                        >
                                            <img
                                                src={p.imageUrl}
                                                alt={p.imageAlt}
                                                className="h-12 w-12 flex-shrink-0 rounded-lg bg-surface-container object-contain"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-body-md text-body-md text-on-surface">{p.title}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-label-md text-label-md font-semibold text-primary">{p.price}</span>
                                                    {p.originalPrice && (
                                                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                                                            {p.originalPrice}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
