'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

interface WatchedMovie {
    id: string;
    title: string;
    rating?: number;
    comment?: string;
}

export default function HistoryPage() {
    const [user] = useAuthState(auth);
    const [history, setHistory] = useState<WatchedMovie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;

            const watchedRef = collection(db, 'users', user.uid, 'watched');
            const snapshot = await getDocs(watchedRef);

            const movies: WatchedMovie[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as any),
            }));

            setHistory(movies);
            setLoading(false);
        };

        fetchHistory();
    }, [user]);

    if (!user)
        return (
            <p className="text-center mt-10">
                Please log in to view your history.
            </p>
        );
    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="container py-8">
            <h1 className="text-2xl font-bold mb-6">Your Watched History</h1>

            {history.length === 0 ? (
                <p className="text-gray-600">
                    No movies found in your history.
                </p>
            ) : (
                <ul className="space-y-4">
                    {history.map((movie) => (
                        <li
                            key={movie.id}
                            className="border p-4 rounded shadow-sm bg-white"
                        >
                            <h2 className="text-lg font-semibold">
                                {movie.title}
                            </h2>
                            {movie.rating && (
                                <p>
                                    <strong>Rating:</strong> {movie.rating}/10
                                </p>
                            )}
                            {movie.comment && (
                                <p>
                                    <strong>Comment:</strong> {movie.comment}
                                </p>
                            )}
                            <Link
                                href={`/movies/${movie.id}`}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                View Movie Details →
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
