'use client';

export default function SuccessToast({ message }: { message: string }) {
    return (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
        <span className="font-semibold">{message}</span>
        </div>
    );
}
