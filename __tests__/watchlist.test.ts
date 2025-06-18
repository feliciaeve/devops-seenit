import { addToWatchlist, removeFromWatchlist, getWatchlist, getWatchlistProducts } from '../actions/watchlist';
import { getMovieDetails } from '../actions/movies';
import { cookies } from 'next/headers';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

jest.mock('../actions/movies', () => ({
  getMovieDetails: jest.fn().mockResolvedValue({ id: 1, title: 'Mock Movie Detail' }),
}));

const mockCookieStore = {
  get: jest.fn(),
  set: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  (cookies as jest.Mock).mockReturnValue(mockCookieStore);
});

describe('watchlist actions', () => {
  it('should return empty watchlist if no cookie', async () => {
    mockCookieStore.get.mockReturnValue(undefined);
    const result = await getWatchlist();
    expect(result).toEqual([]);
  });

  it('should return parsed watchlist if cookie exists', async () => {
    mockCookieStore.get.mockReturnValue({ value: '[1,2]' });
    const result = await getWatchlist();
    expect(result).toEqual([1, 2]);
  });

  it('should add to watchlist if not present', async () => {
    mockCookieStore.get.mockReturnValue({ value: '[]' });
    await addToWatchlist(5);
    expect(mockCookieStore.set).toHaveBeenCalledWith('watchlist', JSON.stringify([5]));
  });

  it('should not add duplicate to watchlist', async () => {
    mockCookieStore.get.mockReturnValue({ value: '[5]' });
    await addToWatchlist(5);
    expect(mockCookieStore.set).not.toHaveBeenCalled();
  });

  it('should remove item from watchlist', async () => {
    mockCookieStore.get.mockReturnValue({ value: '[1,2,3]' });
    await removeFromWatchlist(2);
    expect(mockCookieStore.set).toHaveBeenCalledWith('watchlist', JSON.stringify([1, 3]));
  });

  it('should fetch movie details from watchlist', async () => {
    mockCookieStore.get.mockReturnValue({ value: '[1]' });
    const result = await getWatchlistProducts();
    expect(getMovieDetails).toHaveBeenCalledWith('1');
    expect(result[0].title).toBe('Mock Movie Detail');
  });
});
