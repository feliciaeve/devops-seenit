'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { FaHeart } from 'react-icons/fa6';
import { LuMoonStar, LuSun } from 'react-icons/lu';
import SearchForm from '../forms/SearchForm';
import { useMemo } from 'react';
import Logout from '../Logout'; // Pastikan path ini sesuai

export default function Header() {
    const { theme, setTheme, systemTheme } = useTheme();

    const currentTheme = useMemo(() => {
        if (theme === 'system') {
            return systemTheme;
        }
        return theme;
    }, [theme, systemTheme]);

    return (
        <header className="border-b mb-4 sticky top-0 left-0 z-[3] bg-background">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-medium size-10 flex items-center justify-center border-[3px] rounded-full"
                >
                    M
                </Link>

                {/* Search bar */}
                <SearchForm />

                {/* Right nav */}
                <nav className="flex items-center gap-1 sm:gap-4">
                    {/* Wishlist */}
                    <Button asChild variant="ghost" className="max-sm:size-10">
                        <Link
                            href="/watchlist"
                            className="text-sm font-semibold flex items-center gap-1"
                        >
                            <FaHeart />
                            <span className="max-sm:hidden">Wishlist</span>
                        </Link>
                    </Button>

                    {/* My History */}
                    <Button asChild variant="ghost" className="max-sm:size-10">
                        <Link
                            href="/history"
                            className="text-sm font-semibold flex items-center gap-1"
                        >
                            🎞
                            <span className="max-sm:hidden">My History</span>
                        </Link>
                    </Button>

                    {/* Logout */}
                    <Logout />

                    {/* Theme toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setTheme(currentTheme === 'dark' ? 'light' : 'dark')
                        }
                    >
                        {currentTheme === 'dark' ? <LuSun /> : <LuMoonStar />}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </nav>
            </div>
        </header>
    );
}