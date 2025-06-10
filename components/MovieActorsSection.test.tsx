import { render, screen } from '@testing-library/react';
import MovieActorsSection from './MovieActorsSection';




jest.mock('./LazyImage', () => (props: any) => (
  <img data-testid="actor-image" alt={props.alt} />
));




jest.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => <div>{children}</div>,
  SwiperSlide: ({ children }: any) => <div>{children}</div>,
}));


jest.mock('@/lib/tmdb-image-path', () => ({
  generateTmdbImagePath: (path: string) => `https://fake.image${path}`,
}));


describe('MovieActorsSection', () => {
  it('renders cast members', () => {
    const cast = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      name: `Actor ${i + 1}`,
      character: `Character ${i + 1}`,
      profile_path: `/actor${i + 1}.jpg`,
    }));




    render(<MovieActorsSection cast={cast} />);
    expect(screen.getAllByTestId('actor-image')).toHaveLength(3);
    expect(screen.getByText(/actor 1/i)).toBeInTheDocument();
  });
});