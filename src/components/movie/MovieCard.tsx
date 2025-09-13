import { Link as RouterLink } from 'react-router-dom';
import { Card, Image, Heading, Text, Stack } from '@chakra-ui/react';
import { imageUrl } from '../../api/tmdb';
import type { Movie } from '../../types/tmdb';

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster = imageUrl(movie.poster_path, 'w342');
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';

  return (
    <Card.Root
      asChild
      height="100%"
      _hover={{ transform: 'translateY(-2px)' }}
      transition="0.2s"
    >
      <RouterLink to={`/movie/${movie.id}`}>
        {poster ? (
          <Image src={poster} alt={movie.title} loading="lazy" />
        ) : (
          <div style={{ height: 300, background: '#eee' }} />
        )}
        <Card.Body>
          <Stack gap="1">
            <Heading size="sm">
              {movie.title}
            </Heading>
            <Text fontSize="sm" color="fg.muted">
              {year}
            </Text>
          </Stack>
        </Card.Body>
      </RouterLink>
    </Card.Root>
  );
}
