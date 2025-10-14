import MovieCard from "./components/MovieCard";
import type { SearchResult } from "../types";
import Search from "./components/Search";
import PaginationComponent from "./components/Pagination";
import { cookies } from "next/headers";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let moviesResponse;
  let result: SearchResult;
  const page = (await searchParams)["page"] ?? "1";

  try {
    moviesResponse = await fetch(
      `https://api.themoviedb.org/3/discover/movie?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
        },
      },
    );
    if (!moviesResponse.ok)
      throw { message: "We are having some problems. Please visit us later!" };
    result = await moviesResponse.json();
  } catch (error: unknown) {
    throw new Error((error as { message: string }).message);
  }

  const cookiesStorage = await cookies();

  let guestSessionId = cookiesStorage.get("guestSessionId") || "";

  if (!guestSessionId) {
    const response = await fetch("http://localhost:3000/api/guestSession");
    guestSessionId = await response.json();
  }

  console.log("search: ", guestSessionId);

  return (
    <section className="space-y-5">
      <Search></Search>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {result?.results.map((movie: Movie) => (
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
      <PaginationComponent></PaginationComponent>
    </section>
  );
}
