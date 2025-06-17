'use client';

import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { getMovies } from '@/actions/movies';
=======
>>>>>>> fd40b11abc122a6d51e8e87092c0ca94de593107
import InfiniteMovies from '@/components/InfiniteMovies';
import MovieCard from '@/components/MovieCard';
import LoginGuard from '@/components/LoginGuard';
import { TMovie } from '@/lib/schemas/movie-schemas';

export default function HomePage() {
    const [movies, setMovies] = useState<TMovie[]>([]);
<<<<<<< HEAD

    useEffect(() => {
        getMovies(1)
            .then(setMovies)
            .catch((err) => console.error('Failed to fetch movies:', err));
=======
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const res = await fetch('/api/movies?page=1');
                if (!res.ok) throw new Error('Failed to fetch movies');
                const data = await res.json();
                setMovies(data.results); // sesuaikan dengan struktur respons API route kamu
            } catch (err) {
                console.error('Failed to fetch movies:', err);
                setError('Gagal memuat data film.');
            }
        }

        fetchMovies();
>>>>>>> fd40b11abc122a6d51e8e87092c0ca94de593107
    }, []);

    return (
        <LoginGuard>
            <div className="container pt-6">
<<<<<<< HEAD
                {/* Heading */}
                <h1 className="text-2xl font-bold mb-6">Popular Movies</h1>

                {/* Movie Grid */}
=======
                <h1 className="text-2xl font-bold mb-6">Popular Movies</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

>>>>>>> fd40b11abc122a6d51e8e87092c0ca94de593107
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

<<<<<<< HEAD
                {/* Infinite Scroll */}
=======
>>>>>>> fd40b11abc122a6d51e8e87092c0ca94de593107
                <InfiniteMovies />
            </div>
        </LoginGuard>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> fd40b11abc122a6d51e8e87092c0ca94de593107
