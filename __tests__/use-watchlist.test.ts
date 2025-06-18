import { renderHook, act } from '@testing-library/react';
import { useWatchlist } from '../hooks/use-watchlist';
import * as watchlistActions from '../actions/watchlist';

jest.mock('@/actions/watchlist', () => ({
  getWatchlist: jest.fn(),
  addToWatchlist: jest.fn(),
  removeFromWatchlist: jest.fn(),
}));

describe('useWatchlist', () => {
  const movieId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return default state from isInWishlist prop', () => {
    const { result } = renderHook(() =>
      useWatchlist({ movieId, isInWishlist: true, watch: false })
    );

    expect(result.current.isInWatchlist).toBe(true);
  });

  it('should call getWatchlist on mount if watch=true', async () => {
    (watchlistActions.getWatchlist as jest.Mock).mockResolvedValue([1, 2]);

    const { result } = renderHook(() =>
      useWatchlist({ movieId, isInWishlist: false, watch: true })
    );

    // tunggu useEffect async selesai
    await act(async () => {});

    expect(watchlistActions.getWatchlist).toHaveBeenCalled();
    expect(result.current.isInWatchlist).toBe(true);
  });

  it('should not call getWatchlist if watch=false', async () => {
    renderHook(() =>
      useWatchlist({ movieId, isInWishlist: false, watch: false })
    );

    await act(async () => {});

    expect(watchlistActions.getWatchlist).not.toHaveBeenCalled();
  });

  it('should add to watchlist and update state', async () => {
    const { result } = renderHook(() =>
      useWatchlist({ movieId, isInWishlist: false, watch: false })
    );

    await act(async () => {
      await result.current.handleAddToWishlist();
    });

    expect(watchlistActions.addToWatchlist).toHaveBeenCalledWith(movieId);
    expect(result.current.isInWatchlist).toBe(true);
  });

  it('should remove from watchlist and update state', async () => {
    const { result } = renderHook(() =>
      useWatchlist({ movieId, isInWishlist: true, watch: false })
    );

    await act(async () => {
      await result.current.handleRemoveFromWishlist();
    });

    expect(watchlistActions.removeFromWatchlist).toHaveBeenCalledWith(movieId);
    expect(result.current.isInWatchlist).toBe(false);
  });
});
