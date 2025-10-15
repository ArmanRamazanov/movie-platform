import type { Movie } from "../../types";
import { format } from "date-fns";
import MovieCardImage from "./MovieCardImage";
import MovieRating from "./MovieRating";
import { cookies } from "next/headers";
import CardGenres from "./CardGenres";

export default async function MovieCard({
  posterPath,
  title,
  overview,
  releaseDate,
  genreIds,
  movieId,
  vote_average,
}: Movie) {
  const cookiesStore = await cookies();
  const guestSessionid = cookiesStore.get("guestSessionId")?.value || "";
  let userRating;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/account_states?guest_session_id=${guestSessionid}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok)
      throw { message: "Something went wrong. Please try later" };

    const result = await response.json();
    userRating = result;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }

  return (
    <article className="flex flex-row shadow-lg rounded-md">
      <section className="w-1/3">
        <MovieCardImage posterPath={posterPath} />
      </section>
      <section className="w-2/3 p-2 xxs:p-4">
        <div className="space-y-2 overflow-hidden sm:space-y-3">
          <div>
            <div className="relative">
              <h2 className="text-lg font-medium pr-10">{title}</h2>
              <span
                className={`border border-rating-bad ${
                  vote_average >= 3 && vote_average < 5
                    ? "border-rating-fair"
                    : vote_average >= 5 && vote_average < 7
                      ? "border-rating-good"
                      : vote_average >= 7 && "border-rating-excellent"
                } rounded-full p-2 absolute right-0 top-0 `}
              >
                {vote_average.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-light-gray">
              {releaseDate && format(new Date(releaseDate), "PPP")}
            </p>
          </div>
          <CardGenres genreIds={genreIds} />
          <p className="text-sm leading-6 tracking-normal line-clamp-4 lg:line-clamp-none">
            {overview}
          </p>
          <MovieRating movieId={movieId} userRating={userRating} />
        </div>
      </section>
    </article>
  );
}
