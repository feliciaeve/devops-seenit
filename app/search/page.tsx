'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import MovieCard from '@/components/MovieCard';
import { searchMovies } from '@/actions/movies';
import { TMovie } from '@/lib/schemas/movie-schemas';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query')?.trim() || '';

    const [movies, setMovies] = useState<TMovie[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [ref, inView] = useInView();

    // Reset saat query berubah
    useEffect(() => {
        if (!query || query.length < 3) {
            setMovies([]);
            setPage(1);
            setHasMore(false);
            return;
        }

        const fetchInitial = async () => {
            const result = await searchMovies(query, 1);
            setMovies(result);
            setPage(2);
            setHasMore(result.length > 0);
        };

        fetchInitial();
    }, [query]);

    // Fetch halaman berikutnya saat inView
    useEffect(() => {
        if (!inView || !hasMore || !query || page === 1) return;

        const fetchMore = async () => {
            const result = await searchMovies(query, page);
            setMovies((prev) => [...prev, ...result]);
            setHasMore(result.length > 0);
            setPage((prev) => prev + 1);
        };

        fetchMore();
    }, [inView, query, page, hasMore]);

    return (
        <div className="container">
            <h1 className="text-xl font-bold mb-6">
                Search Results for &quot;{query}&quot;
            </h1>

            {movies.length === 0 ? (
                <p className="text-gray-500">No results found.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}

            {/* Infinite scroll trigger */}
            <div ref={ref} className="h-10" />
        </div>
    );
}