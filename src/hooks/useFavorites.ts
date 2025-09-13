import { useEffect, useMemo, useState } from "react";
import type { Movie } from "../types/tmdb";

const LOCAL_STORAGE_KEY = "favorite_movies";

export function useFavorites() {
  // Load on mount
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Movie[]) : [];
    } catch {
      return [];
    }
  });

  // Update whenever favorites changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const favoriteIds = useMemo(() => new Set(favorites.map((m) => m.id)), [favorites]);

  const add = (m: Movie) => {
    if (!favoriteIds.has(m.id)) setFavorites([...favorites, m]);
  };

  const remove = (id: number) => {
    if (favoriteIds.has(id)) setFavorites(favorites.filter((m) => m.id !== id));
  };

  const toggle = (m: Movie) => {
    if (favoriteIds.has(m.id))
        remove(m.id);
    else
        add(m);
  };

  const isFavorite = (id: number) => favoriteIds.has(id);

  return { favorites, add, remove, toggle, isFavorite };
}
