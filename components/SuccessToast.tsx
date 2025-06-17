'use client';

<<<<<<< HEAD
export default function SuccessToast({ message }: { message: string }) {
    return (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
        <span className="font-semibold">{message}</span>
=======
import { useState } from 'react';

export default function SuccessToast({ message }: { message: string }) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between gap-4 max-w-xs w-full">
            <span className="text-sm font-semibold">{message}</span>
            <button
                onClick={() => setVisible(false)}
                className="text-white text-lg leading-none hover:text-gray-200"
            >
                ×
            </button>
>>>>>>> fd40b11abc122a6d51e8e87092c0ca94de593107
        </div>
    );
}
