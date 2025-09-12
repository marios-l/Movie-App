import { http } from './http';
import type { MovieDetails, SearchResponse } from '../types/tmdb';

export async function searchMovies(query: string, page = 1, year?: string) {
  const params: Record<string, string | number> = { query, page };
  if (year) params.year = Number(year);
  const { data } = await http.get<SearchResponse>('/search/movie', { params });
  return data;
}

export async function getMovieDetails(id: string) {
  const { data } = await http.get<MovieDetails>(`/movie/${id}`, {
    params: { append_to_response: 'credits' },
  });
  return data;
}

export function imageUrl(path?: string | null, size: 'w342' | 'w500' = 'w342') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '';
}
