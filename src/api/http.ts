import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` },
  params: { language: 'en-US' },
});
