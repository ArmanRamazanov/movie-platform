"use client";
import Image from "next/image";

export default function MovieCardImage({ posterPath }: { posterPath: string }) {
  return (
    <Image
      src={`https://image.tmdb.org/t/p/w500${posterPath}`}
      alt="poster image"
      className="min-h-full min-w-full object-fill rounded-l-md"
      width={300}
      height={300}
      onError={(ev) => (ev.currentTarget.src = "/icons/defaultImage.png")}
    />
  );
}
