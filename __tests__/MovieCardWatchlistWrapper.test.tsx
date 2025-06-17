import { render, screen, fireEvent } from '@testing-library/react';
import MovieCardWatchlistWrapper from '../components/MovieCardWatchlistWrapper';

jest.mock('@/hooks/use-watchlist', () => ({
    useWatchlist: jest.fn(() => ({
        isInWatchlist: true,
        setIsInWatchlist: jest.fn(),
        handleRemoveFromWishlist: jest.fn().mockResolvedValue(undefined),
    })),
}));

jest.mock('react-hot-toast', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('MovieCardWatchlistWrapper', () => {
    it('renders children when movie is in watchlist', () => {
        render(
            <MovieCardWatchlistWrapper movieId={1}>
                <p>Movie Content</p>
            </MovieCardWatchlistWrapper>,
        );
        expect(screen.getByText(/movie content/i)).toBeInTheDocument();
    });

    it('does not render anything when not in watchlist', () => {
        jest.mocked(
            require('@/hooks/use-watchlist').useWatchlist,
        ).mockReturnValue({
            isInWatchlist: false,
            setIsInWatchlist: jest.fn(),
            handleRemoveFromWishlist: jest.fn(),
        });

        const { container } = render(
            <MovieCardWatchlistWrapper movieId={1}>
                <p>Should not appear</p>
            </MovieCardWatchlistWrapper>,
        );

        expect(container).toBeEmptyDOMElement();
    });
});
