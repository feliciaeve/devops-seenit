'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { useEffect, useState } from 'react';

type ReadonlyThemeProviderProps = Readonly<ThemeProviderProps>;

export function ThemeProvider({
    children,
    ...props
}: ReadonlyThemeProviderProps) {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
