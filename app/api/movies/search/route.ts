import { NextResponse } from "next/server";
import MovieSearch from "@/app/helperFunctions/MovieSearch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  let response;
  try {
    response = await MovieSearch(query);

    if ("message" in response) {
      return NextResponse.json({ error: response.message }, { status: 500 });
    }
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
