import MovieCard from "./components/MovieCard";
import type { Movie } from "../types";

export default async function page() {
  const moviesResponse = await fetch(
    "https://api.themoviedb.org/3/discover/movie",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
      },
      cache: "no-store",
    }
  );
  const moviesList = await moviesResponse.json();
  return (
    <main className=" bg-gray-200 xl:px-40">
      <ul className="grid grid-cols-1 gap-4 bg-white p-4 md:grid-cols-2">
        {moviesList.results.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
            overview={movie.overview}
            releaseDate={movie.release_date}
            genreIds={movie.genre_ids}
            backdrop_path={movie.backdrop_path}
          />
        ))}
      </ul>
    </main>
  );
}
