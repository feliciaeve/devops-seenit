import { render, screen, waitFor } from '@testing-library/react';
import InfiniteMovies from './InfiniteMovies';
import { useInView } from 'react-intersection-observer';
import { getMovies } from '@/actions/movies';

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

jest.mock('@/actions/movies', () => ({
  getMovies: jest.fn((page: number) =>
    Promise.resolve([
      { id: `${page}-1`, title: `Movie ${page}-1` },
      { id: `${page}-2`, title: `Movie ${page}-2` },
    ])
  ),
}));

jest.mock('./MovieCard', () => ({ movie }: { movie: any }) => (
  <div data-testid="movie-card">{movie.title}</div>
));

describe('InfiniteMovies', () => {
  it('renders movie cards when in view (single page)', async () => {
    // Simulasikan inView hanya aktif satu kali
    let callCount = 0;
    (useInView as jest.Mock).mockImplementation(() => {
      return [{ current: null }, callCount++ === 0];
    });

    render(<InfiniteMovies />);

    const cards = await screen.findAllByTestId('movie-card');

    expect(cards).toHaveLength(2);
    expect(screen.getByText(/movie 1-1/i)).toBeInTheDocument();
    expect(screen.getByText(/movie 1-2/i)).toBeInTheDocument();
    expect(getMovies).toHaveBeenCalledTimes(1);
    expect(getMovies).toHaveBeenCalledWith(1);
  });
});