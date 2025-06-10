import { render, screen } from '@testing-library/react';
import RecommendationSection from './RecommendationSection';

jest.mock('./MovieCard', () => ({ movie }: { movie: any }) => (
  <div data-testid="movie-card">{movie.title}</div>
));

describe('RecommendationSection', () => {
  it('renders up to 10 recommended movie cards', () => {
    const recommendations = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      title: `Movie ${i + 1}`,
      poster_path: `/poster${i + 1}.jpg`,
      backdrop_path: `/backdrop${i + 1}.jpg`,
      overview: `Overview ${i + 1}`,
      release_date: '2023-01-01',
      vote_average: 8.5,
      vote_count: 1000,
      popularity: 90.0,
    }));

    render(<RecommendationSection recommendations={recommendations} />);
    expect(screen.getAllByTestId('movie-card')).toHaveLength(10);
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
  });
});