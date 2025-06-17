import { render, screen } from '@testing-library/react';
import MovieCard from '../components/MovieCard';

// Mock LazyImage to avoid Next.js Image issues
jest.mock('../components/LazyImage', () => (props: any) => (
  <img data-testid="lazy-image" {...props} />
));

// Optional: mock icon
jest.mock('react-icons/fa6', () => ({
  FaStar: () => <span data-testid="fa-star">★</span>,
}));

const baseMovie = {
  id: 1,
  title: 'Inception',
  poster_path: '/inception.jpg',
  backdrop_path: '/inception-bg.jpg',
  overview: 'A mind-bending thriller',
  release_date: '2010-07-16',
  vote_average: 8.8,
  vote_count: 10000,
  popularity: 1000,
};

describe('MovieCard', () => {
  it('renders movie title, vote, and year', () => {
    render(<MovieCard movie={baseMovie} />);
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('8.8')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
  });

  it('renders fallback poster when poster_path is null', () => {
    const movie = { ...baseMovie, poster_path: null };
    render(<MovieCard movie={movie} />);
    expect(screen.getByTestId('lazy-image')).toHaveAttribute('src', '/fallback-poster.jpg');
  });

  it('renders N/A when vote_average is not a number', () => {
    const movie = { ...baseMovie, vote_average: null as any };
    render(<MovieCard movie={movie} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('renders Unknown when release_date is empty', () => {
    const movie = { ...baseMovie, release_date: '' };
    render(<MovieCard movie={movie} />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('renders "No Title" when movie.title is empty', () => {
    const movie = { ...baseMovie, title: '' };
    render(<MovieCard movie={movie} />);
    expect(screen.getByText('No Title')).toBeInTheDocument();
  });
});