import { useParams, Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, imageUrl } from "../../api/tmdb";
import {
  Box,
  Container,
  Heading,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["details", id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <Container maxW="4xl" py={6}>
        <Spinner />
      </Container>
    );
  if (isError || !data)
    return (
      <Container maxW="4xl" py={6}>
        <Text>Failed to load.</Text>
      </Container>
    );

  return (
    <Container maxW="4xl" py={6}>
      <Link asChild>
        <RouterLink to="/">Back</RouterLink>
      </Link>
      <Stack direction={{ base: "column", md: "row" }} gap={6} mt={3}>
        {data.poster_path && (
          <Image
            src={imageUrl(data.poster_path, "w500")}
            alt={data.title}
            maxW="320px"
          />
        )}
        <Box>
          <Heading mb={2}>{data.title}</Heading>
          <Text mb={2}>
            <b>Release:</b> {data.release_date}
          </Text>
          <Text mb={4}>{data.overview}</Text>
          {data.credits?.cast?.length ? (
            <>
              <Text fontWeight="bold" mb={1}>
                Top Cast
              </Text>
              <Text>
                {data.credits.cast
                  .slice(0, 6)
                  .map((c) => c.name)
                  .join(", ")}
              </Text>
            </>
          ) : null}
        </Box>
      </Stack>
    </Container>
  );
}
