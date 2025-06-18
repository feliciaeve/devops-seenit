'use server';

import {
  creditsSchema,
  movieDetailsSchema,
  recommendationsSchema,
  TMovie,
} from '@/lib/schemas/movie-schemas';

const API_KEY = process.env.TMDB_API_KEY;

console.log('API_KEY:', API_KEY);

if (!API_KEY) {
  throw new Error('TMDB_API_KEY is missing. Check your .env.local file!');
}

export const getMovies = async (page: number): Promise<TMovie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    console.error(`getMovies error: ${res.status} ${res.statusText}`);
    throw new Error('Failed to fetch movies');
  }

  const data = await res.json();
  return data.results;
};

export const searchMovies = async (query: string, page: number): Promise<TMovie[]> => {
  if (!query || query.length < 3) {
    throw new Error('Query is too short');
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    console.error(`searchMovies error: ${res.status} ${res.statusText}`);
    throw new Error('Failed to fetch movies');
  }

  const data = await res.json();
  return data.results;
};

export const getMovieDetails = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    console.error(`getMovieDetails error: ${res.status} ${res.statusText}`);
    throw new Error('Failed to fetch movie details');
  }

  const data = await res.json();

  try {
    return movieDetailsSchema.parse(data);
  } catch (error) {
    console.error('Movie details validation error:', error);
    throw new Error('Invalid movie data received from API');
  }
};

export const getMovieCredits = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    console.error(`getMovieCredits error: ${res.status} ${res.statusText}`);
    throw new Error('Failed to fetch cast data');
  }

  const data = await res.json();

  try {
    return creditsSchema.parse(data);
  } catch (error) {
    console.error('Credits validation error:', error);
    throw new Error('Invalid credits data received from API');
  }
};

export const getMovieRecommendations = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    console.error(`getMovieRecommendations error: ${res.status} ${res.statusText}`);
    throw new Error('Failed to fetch recommendations');
  }

  const data = await res.json();

  try {
    return recommendationsSchema.parse(data);
  } catch (error) {
    console.error('Recommendations validation error:', error);
    throw new Error('Invalid recommendations data received from API');
  }
};