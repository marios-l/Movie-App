import { Text } from "@chakra-ui/react";
import MovieCard from "../../components/movie/MovieCard";
import { useFavorites } from "../../hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites, toggle, isFavorite } = useFavorites();

  return (
    <>
      {favorites.length === 0 ? (
        <Text>No favorites</Text>
      ) : (
        favorites.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onToggleFavorite={() => toggle(m)}
            isFavorite={isFavorite(m.id)}
          />
        ))
      )}
    </>
  );
}
