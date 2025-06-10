import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddToWatchlist from './AddToWatchList';

// Mock toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: jest.fn(),
  error: jest.fn(),
}));

// Mock useWatchlist hook
jest.mock('@/hooks/use-watchlist', () => ({
  useWatchlist: jest.fn(),
}));

import toast from 'react-hot-toast';
import { useWatchlist } from '@/hooks/use-watchlist';

describe('AddToWatchlistButton', () => {
  const setIsInWatchlist = jest.fn();
  const handleAddToWishlist = jest.fn().mockResolvedValue(undefined);
  const handleRemoveFromWishlist = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render button with "Add to Watchlist" if not in watchlist', () => {
    (useWatchlist as jest.Mock).mockReturnValue({
      isInWatchlist: false,
      setIsInWatchlist,
      handleAddToWishlist,
      handleRemoveFromWishlist,
    });

    render(<AddToWatchlist movieId={1} />);
    expect(screen.getByText(/add to watchlist/i)).toBeInTheDocument();
  });

  it('should render button with "Remove from Watchlist" if in watchlist', () => {
    (useWatchlist as jest.Mock).mockReturnValue({
      isInWatchlist: true,
      setIsInWatchlist,
      handleAddToWishlist,
      handleRemoveFromWishlist,
    });

    render(<AddToWatchlist movieId={1} />);
    expect(screen.getByText(/remove from watchlist/i)).toBeInTheDocument();
  });

  it('should call add handler when clicking add button', async () => {
    (useWatchlist as jest.Mock).mockReturnValue({
      isInWatchlist: false,
      setIsInWatchlist,
      handleAddToWishlist,
      handleRemoveFromWishlist,
    });

    render(<AddToWatchlist movieId={1} />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(setIsInWatchlist).toHaveBeenCalledWith(true);
      expect(handleAddToWishlist).toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith('Added to watchlist');
    });
  });

  it('should call remove handler when clicking remove button', async () => {
    (useWatchlist as jest.Mock).mockReturnValue({
      isInWatchlist: true,
      setIsInWatchlist,
      handleAddToWishlist,
      handleRemoveFromWishlist,
    });

    render(<AddToWatchlist movieId={1} />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(setIsInWatchlist).toHaveBeenCalledWith(false);
      expect(handleRemoveFromWishlist).toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith('Removed from watchlist');
    });
  });
});
