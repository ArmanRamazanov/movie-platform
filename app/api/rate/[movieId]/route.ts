import { NextResponse } from "next/server";

interface RouteParams {
  params: {
    movieId: string;
  };
}

export async function POST(request: Request, { params }: RouteParams) {
  const { movieId } = await params;
  const { searchParams } = new URL(request.url);
  const guest_session_id = searchParams.get("guest_session_id");

  const { value } = await request.json();

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guest_session_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          value,
        }),
      },
    );

    console.log(await response.json());
    if (!response.ok)
      throw { message: "Something went wrong", status: response.status };

    return NextResponse.json("rating added");
  } catch (error) {
    const errorObject = error as { message: string; status: number };
    return NextResponse.json(
      {
        errorMessage: errorObject.message,
      },
      {
        status: errorObject.status,
      },
    );
  }
}
