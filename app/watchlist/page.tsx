import { getWatchlistProducts } from '@/actions/watchlist';
import MovieCard from '@/components/MovieCard';
import MovieCardWatchlistWrapper from '@/components/MovieCardWatchlistWrapper';
import WatchAndRateForm from '@/components/HistoryRating';

const WatchlistPage = async () => {
    const watchlist = await getWatchlistProducts();

    return (
        <div className="container">
            <h1 className="text-xl font-bold mb-6">Your Watchlist</h1>
            {watchlist.length === 0 ? (
                <p>Your watchlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {watchlist.map((movie) => (
                        <div
                            key={movie.id}
                            className="border p-4 rounded bg-white shadow"
                        >
                            <MovieCardWatchlistWrapper movieId={movie.id}>
                                <MovieCard movie={movie} />
                            </MovieCardWatchlistWrapper>

                            <WatchAndRateForm
                                movieId={movie.id.toString()}
                                movieTitle={movie.title}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WatchlistPage;
