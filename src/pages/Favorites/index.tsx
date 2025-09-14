import { Link as RouterLink } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import {
  Button,
  Container,
  EmptyState,
  Grid,
  GridItem,
  Heading,
  Span,
  VStack,
} from "@chakra-ui/react";
import MovieCard from "../../components/movie/MovieCard";
import { ArrowBigLeft, HeartPlus } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, toggle, isFavorite } = useFavorites();

  return (
    <Container maxW="6xl" py={2} px={0}>
      <Heading as={"h1"} display="flex" alignItems="center" gap={3}>
        <RouterLink to="/">
          <ArrowBigLeft color="#444" fill="#444" />
        </RouterLink>
        <Span>My Favorites</Span>
      </Heading>

      {favorites.length === 0 ? (
        <EmptyState.Root
          mt={10}
          marginInline="auto"
          borderRadius="sm"
          width="fit-content"
          shadow="md"
        >
          <EmptyState.Content>
            <EmptyState.Indicator>
              <HeartPlus />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>Your favorites list is empty</EmptyState.Title>
              <EmptyState.Description>
                Search for movies and add them to your favorites
              </EmptyState.Description>
            </VStack>
            <RouterLink to="/">
              <Button variant="outline">Search movies</Button>
            </RouterLink>
          </EmptyState.Content>
        </EmptyState.Root>
      ) : (
        <Grid
          templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
          gap={4}
          mt={8}
        >
          {favorites.map((m) => (
            <GridItem key={m.id}>
              <MovieCard
                movie={m}
                onToggleFavorite={() => toggle(m)}
                isFavorite={isFavorite(m.id)}
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </Container>
  );
}
