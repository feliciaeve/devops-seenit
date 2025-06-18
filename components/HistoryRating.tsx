'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/firebase';
import { doc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

interface WatchAndRateFormProps {
  movieId: string;
  movieTitle: string;
}

export default function WatchAndRateForm({ movieId, movieTitle }: WatchAndRateFormProps) {
  const [user] = useAuthState(auth);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) return;

    // Simpan entry awal ke 'watched' (jika belum)
    const saveInitialWatch = async () => {
      await setDoc(
        doc(db, 'users', user.uid, 'watched', movieId),
        {
          watchedAt: serverTimestamp(),
          title: movieTitle,
        },
        { merge: true },
      );
    };

    saveInitialWatch();
  }, [user, movieId, movieTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Simpan review (rating dan komentar)
    await setDoc(
      doc(db, 'users', user.uid, 'watched', movieId),
      {
        rating,
        comment,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    // Hapus dari watchlist
    await deleteDoc(doc(db, 'users', user.uid, 'watchlist', movieId));

    setSuccess('Thank you! Your review has been saved and movie removed from watchlist.');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Your Review</h3>
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="block">
          Rating (1–10):
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="block w-full mt-1 p-2 border rounded text-black bg-white"
            required
          />
        </label>

        <label className="block">
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your comment..."
            className="block w-full mt-1 p-2 border rounded text-black bg-white"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}