import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';

jest.mock('./LazyImage', () => (props: any) => (
  <img data-testid="poster" alt={props.alt} />
));

describe('MovieCard', () => {
  it('renders movie title, vote, and release year', () => {
    const movie = {
      id: 1,
      title: 'Test Movie',
      poster_path: '/test.jpg',
      vote_average: 8.2,
      release_date: '2024-01-01',
    };

    render(<MovieCard movie={movie} />);

    expect(screen.getByText(/test movie/i)).toBeInTheDocument();
    expect(screen.getByText(/8\.2/i)).toBeInTheDocument();
    expect(screen.getByText(/2024/i)).toBeInTheDocument();
    expect(screen.getByTestId('poster')).toBeInTheDocument();
  });
});
