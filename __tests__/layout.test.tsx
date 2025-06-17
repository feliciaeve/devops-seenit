import { render, screen } from '@testing-library/react';
import RootLayout from '../app/layout';

jest.mock('next/font/google', () => ({
    Open_Sans: () => ({
        variable: 'mocked-font',
    }),
}));

jest.mock('@/components/layout/Header', () => () => (
    <header data-testid="header">Header</header>
));
jest.mock('@/components/layout/Footer', () => () => (
    <footer data-testid="footer">Footer</footer>
));
jest.mock('@/components/layout/ThemeProvider', () => ({
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="theme">{children}</div>
    ),
}));
jest.mock('react-hot-toast', () => ({
    Toaster: () => <div data-testid="toaster">Toaster</div>,
}));

describe('RootLayout', () => {
    it('renders Header, Footer, Toaster, and children', () => {
        render(
            <RootLayout>
                <div data-testid="content">Test Content</div>
            </RootLayout>,
        );

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
        expect(screen.getByTestId('theme')).toBeInTheDocument();
        expect(screen.getByTestId('toaster')).toBeInTheDocument();
        expect(screen.getByTestId('content')).toBeInTheDocument();
    });
});
