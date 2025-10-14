"use client";
import { Input, Spin } from "antd";
import { useState, useMemo } from "react";
import debounce from "../helperFunctions/debounce";
import type { SearchResult } from "../../types";
import type { Movie } from "../../types";
import { format } from "date-fns";
import Link from "next/link";

export default function SearchFunctionality() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult>({
    results: [],
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(!searchValue);
  const debouncedFunction = useMemo(
    () =>
      debounce(async (value: string) => {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:3000/api/movies/search?query=${value}`,
          );
          if (!response.ok) {
            throw { message: "Something went wrong" };
          }

          const movies = await response.json();
          if (!movies.results.length)
            setErrorMessage("Could not find anything");
          setSearchResult(movies);
        } catch (error) {
          setErrorMessage((error as { message: string }).message);
        } finally {
          setLoading(false);
        }
      }, 300),
    [],
  );
  console.log(searchResult);
  return (
    <div className="relative space-y-1 mb-8">
      <Input
        placeholder="Type to search..."
        size="large"
        onChange={async (e) => {
          setSearchValue(e.target.value);
          debouncedFunction(e.target.value);
          setErrorMessage("");
        }}
        value={searchValue}
      ></Input>
      <ul className="flex flex-col max-h-80 overflow-y-scroll absolute bg-white w-full rounded-b-md shadow-2xl">
        <li className="min-h-4 rounded-sm flex flex-row background justify-center">
          <Spin spinning={loading} size="small"></Spin>
          {searchValue && errorMessage && (
            <p className="text-md">{errorMessage}</p>
          )}
        </li>
        {searchResult?.results.map((movie: Movie) => (
          <li
            className="border border-gray-200 p-1.5 pl-3 rounded-sm flex flex-row background"
            onClick={() => {
              setSearchValue("");
              setSearchResult({ results: [] });
            }}
            key={movie.id}
          >
            <section>
              <img
                className="max-h-30 max-w-20"
                src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}
                onError={(ev) =>
                  (ev.currentTarget.src = "/icons/defaultImage.png")
                }
              />
            </section>
            <section className="flex-1 px-3 space-y-1.5">
              <div>
                <Link
                  href=""
                  className="text-lg "
                  onClick={() => {
                    setSearchValue("");
                  }}
                >
                  {movie.title}
                </Link>
                <p className="text-xs text-light-gray">
                  {movie.release_date &&
                    format(new Date(movie.release_date), "PPP")}
                </p>
              </div>
              <section className="space-y-1">
                <ul className="flex flex-row gap-1">
                  {movie.genre_ids.map((genre: number) => (
                    <li
                      key={genre}
                      className="border border-gray-200 px-2 text-xs text-light-gray"
                    >
                      {genre}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-700">
                  ⭐ {movie.vote_average} / 10
                </p>
                <p className="text-sm text-gray-700">
                  {movie.vote_count === 0
                    ? " No votes"
                    : movie.vote_count > 1
                      ? `👍 ${movie.vote_count} people have voted`
                      : "👍 1 person has voted"}
                </p>
              </section>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
}
