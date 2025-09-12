export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  overview?: string;
};

export type SearchResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieDetails = Movie & {
  credits?: { cast: Array<{ name: string; character?: string }> };
};
