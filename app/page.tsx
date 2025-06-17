'use client';

import { useEffect, useState } from 'react';
import { getMovies } from '@/actions/movies';

import InfiniteMovies from '@/components/InfiniteMovies';
import MovieCard from '@/components/MovieCard';
import LoginGuard from '@/components/LoginGuard';
import { TMovie } from '@/lib/schemas/movie-schemas';

export default function HomePage() {
    const [movies, setMovies] = useState<TMovie[]>([]);

    useEffect(() => {
        getMovies(1)
            .then(setMovies)
            .catch((err) => console.error('Failed to fetch movies:', err));
    }, []);

    return (
        <LoginGuard>
            <div className="container pt-6">
                {/* Heading */}
                <h1 className="text-2xl font-bold mb-6">Popular Movies</h1>

                {/* Movie Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                {/* Infinite Scroll */}
                <InfiniteMovies />
            </div>
        </LoginGuard>
    );
}

