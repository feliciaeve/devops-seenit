import AddToWatchList from '@/components/AddToWatchList';
import LazyImage from '@/components/LazyImage';
import MovieActorsSection from '@/components/MovieActorsSection';
import RecommendationSection from '@/components/RecommendationSection';
import HistoryRating from '@/components/HistoryRating';
import { dateFormatter } from '@/lib/date-formatter';
import { generateTmdbImagePath } from '@/lib/tmdb-image-path';
import { getImageProps } from 'next/image';
import { FaStar } from 'react-icons/fa6';
import {
    getMovies,
    getMovieCredits,
    getMovieDetails,
    getMovieRecommendations,
} from '@/actions/movies';

interface Params {
    params: Promise<{ id: string }>;
}

export const revalidate = 60;

export const generateStaticParams = async () => {
    const movies = await getMovies(1);
    return movies.map((movie) => ({
        params: {
            id: movie.id.toString(),
        },
    }));
};

export const generateMetadata = async ({ params }: Params) => {
    const movieId = (await params).id;
    const movie = await getMovieDetails(movieId);

    return {
        title: movie.title,
        description: movie.overview,
        image: generateTmdbImagePath(movie.poster_path, 500),
    };
};

export default async function MoviePage({ params }: Params) {
    const movieId = (await params).id;

    const [movie, credits, recommendations] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
        getMovieRecommendations(movieId),
    ]);

    const optimizedBackdrop = getImageProps({
        src: generateTmdbImagePath(movie.backdrop_path, 780),
        alt: movie.title,
        width: 1280,
        height: 700,
        quality: 10,
        priority: true,
    }).props.src;

    return (
        <>
            <section
                className="bg-cover bg-center bg-no-repeat py-8 text-white mb-8 -mt-4 relative"
                style={{
                    backgroundImage: `linear-gradient(#000000bb, #000000bb), url(${optimizedBackdrop})`,
                }}
            >
                <div className="container flex flex-col md:flex-row gap-8">
                    <div className="w-full max-w-[200px] max-md:mx-auto md:max-w-[300px]">
                        <LazyImage
                            src={generateTmdbImagePath(movie.poster_path, 200)}
                            alt={movie.title}
                            width={200}
                            height={300}
                            className="rounded-lg border-4 border-border/30"
                        />
                    </div>

                    <div className="w-full md:w-2/3 space-y-4">
                        <h1 className="text-2xl font-bold">{movie.title}</h1>

                        <div className="flex items-center gap-2 text-sm">
                            <span className="inline-flex items-center gap-1">
                                <FaStar size={14} className="text-orange-500" />
                                {movie.vote_average.toFixed(1)}
                            </span>
                            <span className="size-1 bg-gray-500 rounded-full" />
                            <span>{movie.vote_count} votes</span>
                            <span className="size-1 bg-gray-500 rounded-full" />
                            <span>
                                {dateFormatter(new Date(movie.release_date))}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="bg-white/10 px-2 py-1 rounded-full"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <p className="text-sm italic">{movie.tagline}</p>

                        <h3 className="text-sm font-semibold uppercase">
                            Overview
                        </h3>
                        <p>{movie.overview}</p>

                        <AddToWatchList movieId={movie.id} />

                        <div className="mt-6">
                            <h2 className="text-xl font-bold mb-2">
                                Your Review
                            </h2>
                            <HistoryRating
                                movieId={movie.id.toString()}
                                movieTitle={movie.title}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container space-y-8">
                <MovieActorsSection cast={credits.cast} />
                <RecommendationSection
                    recommendations={recommendations.results}
                />
            </div>
        </>
    );
}