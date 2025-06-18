import { render, screen } from '@testing-library/react';
import MovieCard from '../components/MovieCard';

const mockMovie = {
    id: 1,
    title: 'Inception',
    poster_path: '/inception.jpg',
    backdrop_path: '/inception-bg.jpg',
    overview: 'A mind-bending thriller by Christopher Nolan.',
    release_date: '2010-07-16',
    vote_average: 8.8,
    vote_count: 10000,
    popularity: 1000,
};

describe('MovieCard', () => {
    it('renders movie title and image', () => {
        render(<MovieCard movie={mockMovie} />);
        expect(screen.getByText('Inception')).toBeInTheDocument();
        expect(screen.getByAltText('Inception')).toBeInTheDocument();
    });
});
