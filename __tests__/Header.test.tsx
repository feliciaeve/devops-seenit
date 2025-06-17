import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/layout/Header';
import { useTheme } from 'next-themes';

jest.mock('next/link', () => {
    return ({ children }: { children: React.ReactNode }) => children;
});

jest.mock('../components/forms/SearchForm', () => () => (
    <div data-testid="search-form" />
));

// Mock komponen Logout agar tidak ikut dirender (cukup placeholder)
jest.mock('../components/Logout', () => () => (
    <button data-testid="logout-btn">Logout</button>
));

// Mock icon dari react-icons agar tidak error di test
jest.mock('react-icons/fa6', () => ({
    FaHeart: () => <svg data-testid="icon-faheart" />,
}));
jest.mock('react-icons/lu', () => ({
    LuMoonStar: () => <svg data-testid="icon-lumoonstar" />,
    LuSun: () => <svg data-testid="icon-lusun" />,
}));

// Mock useTheme dari next-themes agar kita bisa kontrol tema saat test
jest.mock('next-themes', () => ({
    useTheme: jest.fn(),
}));

describe('Header component', () => {
    const setThemeMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        // Default mock theme setup, tema system adalah light
        (useTheme as jest.Mock).mockReturnValue({
            theme: 'light',
            systemTheme: 'light',
            setTheme: setThemeMock,
        });
    });

    it('renders all main elements', () => {
        render(<Header />);

        // Logo "M"
        expect(screen.getByText('M')).toBeInTheDocument();

        // Komponen SearchForm placeholder
        expect(screen.getByTestId('search-form')).toBeInTheDocument();

        // Link Wishlist dengan icon dan label
        expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
        expect(screen.getByTestId('icon-faheart')).toBeInTheDocument();

        // Link My History dengan label
        expect(screen.getByText(/my history/i)).toBeInTheDocument();

        // Tombol Logout
        expect(screen.getByTestId('logout-btn')).toBeInTheDocument();

        // Tombol toggle tema harus ada
        expect(
            screen.getByRole('button', { name: /toggle theme/i }),
        ).toBeInTheDocument();
    });

    it('toggles theme from light to dark when button clicked', () => {
        render(<Header />);

        const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });

        // Saat tema light, ikon yang muncul harus LuMoonStar (dari mock)
        expect(screen.queryByTestId('icon-lusun')).not.toBeInTheDocument();
        expect(screen.getByTestId('icon-lumoonstar')).toBeInTheDocument();

        fireEvent.click(toggleBtn);

        // Saat klik, setTheme dipanggil dengan 'dark'
        expect(setThemeMock).toHaveBeenCalledWith('dark');
    });

    it('toggles theme from dark to light when button clicked', () => {
        // Mock tema awal dark
        (useTheme as jest.Mock).mockReturnValue({
            theme: 'dark',
            systemTheme: 'light',
            setTheme: setThemeMock,
        });

        render(<Header />);

        const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });

        // Saat tema dark, ikon yang muncul harus LuSun (dari mock)
        expect(screen.getByTestId('icon-lusun')).toBeInTheDocument();
        expect(screen.queryByTestId('icon-lumoonstar')).not.toBeInTheDocument();

        fireEvent.click(toggleBtn);

        // Saat klik, setTheme dipanggil dengan 'light'
        expect(setThemeMock).toHaveBeenCalledWith('light');
    });
});
