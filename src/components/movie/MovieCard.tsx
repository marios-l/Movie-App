import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  Image,
  Heading,
  Text,
  Stack,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { imageUrl } from "../../api/tmdb";
import type { Movie } from "../../types/tmdb";
import { Heart } from "lucide-react";
import { Tooltip } from "../ui/tooltip";

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
      border="none"
      _hover={{ transform: "translateY(-2px)" }}
      transition="0.2s"
    >
      <RouterLink to={`/movie/${movie.id}`}>
        {poster ? (
          <Image
            borderRadius="md"
            src={poster}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <Box height={300} borderRadius="md" backgroundColor="#eee"></Box>
        )}
      </RouterLink>

      {onToggleFavorite && (
        <Tooltip
          content={isFavorite ? "Remove from favorites" : "Add to favorites"}
          openDelay={50}
          closeDelay={100}
        >
          <IconButton
            position="absolute"
            right={1}
            top={1}
            colorPalette={isFavorite ? "yellow" : "gray"}
            rounded="full"
            aria-label="favorite"
            onClick={() => onToggleFavorite(movie)}
          >
            <Heart />
          </IconButton>
        </Tooltip>
      )}

      <Card.Body justifyContent="space-between" p={1.5}>
        <Stack gap="0">
          <Heading lineHeight={1} fontWeight={500} size="sm">
            {movie.title}
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            {year}
          </Text>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
