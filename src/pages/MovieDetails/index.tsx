import { useParams, Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, imageUrl } from "../../api/tmdb";
import {
  Box,
  Container,
  Heading,
  Image,
  Link,
  Span,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowBigLeft } from "lucide-react";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["details", id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  return (
    <Container maxW="4xl" py={6}>
      <Heading as={"h1"} display="flex" alignItems="center" gap={3}>
        <RouterLink to="/">
          <ArrowBigLeft color="#444" fill="#444" />
        </RouterLink>
        <Span>Movie details</Span>
      </Heading>

      {isLoading && <Spinner mt={5} />}

      {(isError || !data) && !isLoading && (
        <Text mt={4}>Failed to load movie details.</Text>
      )}

      {data && !isLoading && !isError && (
        <>
          <Stack direction={{ base: "column", md: "row" }} gap={6} mt={4}>
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
                    Cast
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
        </>
      )}
    </Container>
  );
}
