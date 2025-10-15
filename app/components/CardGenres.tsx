"use client";
import { useContext } from "react";
import { GenresContext } from "../layerProvider";

export default function CardGenres({ genreIds }: { genreIds: number[] }) {
  const genresObject = useContext(GenresContext);

  return (
    <ul className="flex flex-row gap-1">
      {genreIds.map((genreId) => (
        <li
          className="border border-gray-200 px-2 text-xs text-light-gray"
          key={genreId}
        >
          {genresObject[genreId]}
        </li>
      ))}
    </ul>
  );
}
