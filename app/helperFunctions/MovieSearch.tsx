export default async function MovieSearch(query: string) {
  let response;
  try {
    response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
          Accept: "application/json",
        },
      },
    );
    if (!response.ok)
      throw { message: "Something went wrong. Please try again!" };
    return await response.json();
  } catch (error: unknown) {
    return { message: (error as Error).message || "Unknown error" };
  }
}
