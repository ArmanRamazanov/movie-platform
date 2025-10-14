import type { Movie } from "../../types";
import { format } from "date-fns";
import MovieCardImage from "./MovieCardImage";

export default function MovieCard({
  posterPath,
  title,
  overview,
  releaseDate,
  genreIds,
}: Movie) {
  return (
    <article className="flex flex-row shadow-lg rounded-md">
      <section className="w-1/3">
        <MovieCardImage posterPath={posterPath} />
      </section>
      <section className="w-2/3 p-2 xxs:p-4">
        <div className="space-y-2 overflow-hidden sm:space-y-3">
          <div>
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="text-xs text-light-gray">
              {releaseDate && format(new Date(releaseDate), "PPP")}
            </p>
          </div>
          <ul className="flex flex-row gap-x-1">
            {genreIds?.map((genreId: number) => (
              <li
                className="border border-gray-200 px-2 text-xs text-light-gray"
                key={genreId}
              >
                {genreId}
              </li>
            ))}
          </ul>
          <p className="text-sm leading-6 tracking-normal line-clamp-4 lg:line-clamp-none">
            {overview}
          </p>
        </div>
      </section>
    </article>
  );
}
