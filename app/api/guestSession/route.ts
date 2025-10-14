import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
      },
    },
  );
  if (!response.ok)
    throw { message: "We could not generate session. Please try later!" };

  const data = await response.json();
  const nextResponse = NextResponse.json(data);
  nextResponse.cookies.set("guestSessionId", data.guest_session_id, {
    path: "/",
  });

  return nextResponse;
}
