import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  Image,
  Heading,
  Text,
  Stack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { imageUrl } from "../../api/tmdb";
import type { Movie } from "../../types/tmdb";

type MovieCardProps = {
  movie: Movie;
  isFavorite?: boolean;
  onToggleFavorite?: (movie: Movie) => void;
};

export default function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  const poster = imageUrl(movie.poster_path, "w342");
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";

  return (
    <Card.Root
      height="100%"
      //shadow="sm"
      overflow="hidden"
      border="none"
      _hover={{ transform: "translateY(-2px)" }}
      transition="0.2s"
    >
      <RouterLink to={`/movie/${movie.id}`}>
        {poster ? (
          <Image src={poster} alt={movie.title} loading="lazy" />
        ) : (
          <div style={{ height: 300, background: "#eee" }} />
        )}
      </RouterLink>

      <Card.Body p={1.5}>
        <Stack gap="0">
          <Heading lineHeight={1} fontWeight={500} size="sm">
            {movie.title}
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            {year}
          </Text>
        </Stack>

        {onToggleFavorite && (
          <HStack mt={2}>
            <Button
              size="sm"
              variant={isFavorite ? "solid" : "outline"}
              colorScheme={isFavorite ? "pink" : "gray"}
              onClick={() => onToggleFavorite(movie)}
            >
              {isFavorite ? "Remove Favorite" : "Add Favorite"}
            </Button>
          </HStack>
        )}
      </Card.Body>
    </Card.Root>
  );
}
