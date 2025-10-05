type Movie = {
  id: number;
  title: string;
  original_language: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
  backgrop_path: string;
  [key: string]: unknown;
};

type Genre = {
  id: number;
  name: string;
};
