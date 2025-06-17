'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase';
import AuthForm from './AuthForm';

export default function LoginGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // null jika belum login
        });

        return () => unsubscribe(); // Cleanup listener
    }, []);

    if (user === undefined) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-600 text-sm animate-pulse">
                    Checking login status...
                </p>
            </div>
        );
    }

    //  Belum login → Tampilkan form login/register
    if (!user) {
        return <AuthForm />;
    }

    // Sudah login → Lanjut ke halaman
    return <>{children}</>;
}
