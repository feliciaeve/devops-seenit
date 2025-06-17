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
<<<<<<< HEAD
            setUser(currentUser); // null jika belum login
        });

        return () => unsubscribe(); // Cleanup listener
    }, []);

    // ✅ Menunggu auth state
=======
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

>>>>>>> fd40b11abc122a6d51e8e87092c0ca94de593107
    if (user === undefined) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-600 text-sm animate-pulse">
                    Checking login status...
                </p>
            </div>
        );
    }

    // ⛔ Belum login → Tampilkan form login/register
    if (!user) {
        return <AuthForm />;
    }

    // ✅ Sudah login → Lanjut ke halaman
    return <>{children}</>;
<<<<<<< HEAD
}
=======
}
>>>>>>> fd40b11abc122a6d51e8e87092c0ca94de593107
