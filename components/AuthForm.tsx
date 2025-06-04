
'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import SuccessToast from './SuccessToast';

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                setSuccess('Login successful!');
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                setSuccess('Registration successful!');
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Auto-close toast after 3s
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 relative">
            {success && <SuccessToast message={success} />}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    {isLogin ? 'Login' : 'Register'}
                </h2>

                {error && (
                    <p className="text-red-500 mb-4 text-sm text-center">
                        {error}
                    </p>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                    {isLogin ? 'Login' : 'Register'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    {isLogin
                        ? "Don't have an account?"
                        : 'Already have an account?'}{' '}
                    <button
                        type="button"
                        className="text-blue-600 hover:underline"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </div>
    );
}