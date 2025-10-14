import { cookies } from "next/headers";
import type { Movies } from "../../types";
import MovieCard from "../components/MovieCard";

export default async function page() {
  const guestSessionId = (await cookies()).get("guestSessionId")?.value || "";

  let ratedMovies: Movies[];
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
        },
      },
    );

    if (!response.ok) throw { status: response.status };

    const result = await response.json();
    ratedMovies = result.results;
  } catch (error) {
    const errorObject = error as { status: number };

    if (errorObject.status === 404) {
      throw new Error("No movies rated");
    } else {
      throw new Error("Something went wrong. Please try again later!");
    }
  }

  return (
    <section>
      <ul>
        {ratedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
            overview={movie.overview}
            releaseDate={movie.release_date}
            genreIds={movie.genre_ids}
            backdrop_path={movie.backdrop_path}
          ></MovieCard>
        ))}
      </ul>
    </section>
  );
}
