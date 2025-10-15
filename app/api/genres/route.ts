import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list",
    {
      headers: {
        Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
      },
    },
  );

  if (!response.ok) return NextResponse.json({ error: "Something went wrong" });

  const result = await response.json();
  return NextResponse.json(result);
}
