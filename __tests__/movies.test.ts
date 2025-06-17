process.env.TMDB_API_KEY = 'dummy_key';

import * as nodeFetch from 'node-fetch';
(global as any).fetch = nodeFetch.default;

const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('TMDB API handlers', () => {
  const mockJson = (data: any) =>
    new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  beforeEach(() => {
    (global.fetch as jest.Mock) = jest.fn();
    jest.resetModules();
    jest.clearAllMocks();
    process.env.TMDB_API_KEY = 'dummy_key';
  });

  it('getMovies fetches popular movies', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      mockJson({ results: [{ id: 1, title: 'Mock Movie' }] })
    );

    const { getMovies } = await import('../actions/movies');
    const movies = await getMovies(1);
    expect(movies[0].title).toBe('Mock Movie');
  });

  it('searchMovies fetches with query', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      mockJson({ results: [{ id: 2, title: 'Search Result' }] })
    );

    const { searchMovies } = await import('../actions/movies');
    const movies = await searchMovies('batman', 1);
    expect(movies[0].title).toBe('Search Result');
  });

  it('searchMovies throws if query too short', async () => {
    const { searchMovies } = await import('../actions/movies');
    await expect(searchMovies('hi', 1)).rejects.toThrow('Query is too short');
  });

  it('getMovieDetails returns parsed details', async () => {
    const mockData = {
      id: 3,
      title: 'Detail Movie',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      overview: 'A great movie',
      release_date: '2025-01-01',
      vote_average: 8.1,
      vote_count: 1234,
      popularity: 98.5,
      genres: [{ id: 1, name: 'Action' }],
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockJson(mockData));

    const { getMovieDetails } = await import('../actions/movies');
    const result = await getMovieDetails('3');
    expect(result.title).toBe('Detail Movie');
  });

  it('getMovieCredits returns parsed credits', async () => {
    const mockData = {
      id: 4,
      cast: [
        {
          id: 1,
          name: 'Actor',
          character: 'Hero',
          profile_path: '/actor.jpg', // ✅ Tambahkan ini
        },
      ],
      crew: [{ id: 2, name: 'Director', job: 'Director' }],
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockJson(mockData));

    const { getMovieCredits } = await import('../actions/movies');
    const result = await getMovieCredits('4');
    expect(result.cast[0].name).toBe('Actor');
  });

  it('getMovieRecommendations returns parsed data', async () => {
    const mockData = {
      results: [
        {
          id: 5,
          title: 'Recommended Movie',
          poster_path: '/poster2.jpg',
          backdrop_path: '/backdrop2.jpg',
          overview: 'Recommended movie description',
          release_date: '2024-05-20',
          vote_average: 7.5,
          vote_count: 800,
          popularity: 70,
        },
      ],
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockJson(mockData));

    const { getMovieRecommendations } = await import('../actions/movies');
    const result = await getMovieRecommendations('5');
    expect(result.results[0].title).toBe('Recommended Movie');
  });
});
