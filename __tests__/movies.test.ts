import {
  getMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieRecommendations,
} from '../actions/movies';
import fetch from 'node-fetch';

jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch');

describe('TMDB API handlers', () => {
  const mockJson = (data: any) =>
    new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  beforeEach(() => {
    process.env.TMDB_API_KEY = 'dummy_key';
    jest.clearAllMocks();
  });

  it('getMovies fetches popular movies', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      mockJson({ results: [{ id: 1, title: 'Mock Movie' }] })
    );
    const movies = await getMovies(1);
    expect(movies[0].title).toBe('Mock Movie');
  });

  it('searchMovies fetches with query', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      mockJson({ results: [{ id: 2, title: 'Search Result' }] })
    );
    const movies = await searchMovies('batman', 1);
    expect(movies[0].title).toBe('Search Result');
  });

  it('searchMovies throws if query too short', async () => {
    await expect(searchMovies('hi', 1)).rejects.toThrow('Query is too short');
  });

  it('getMovieDetails returns parsed details', async () => {
    const mockData = { id: 3, title: 'Detail Movie' };
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(mockJson(mockData));
    const result = await getMovieDetails('3');
    expect(result.id).toBe(3);
  });

  it('getMovieCredits returns parsed credits', async () => {
    const mockData = { id: 4, cast: [], crew: [] };
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(mockJson(mockData));
    const result = await getMovieCredits('4');
    expect(result.cast).toBeDefined();
  });

  it('getMovieRecommendations returns parsed data', async () => {
    const mockData = { results: [{ id: 5, title: 'Recommended Movie' }] };
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(mockJson(mockData));
    const result = await getMovieRecommendations('5');
    expect(result).toBeDefined();
  });
});
