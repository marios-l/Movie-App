import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../api/tmdb";
import MovieCard from "../../components/movie/MovieCard";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Input,
  Spinner,
  Text,
  Select,
  Portal,
  createListCollection,
  InputGroup,
} from "@chakra-ui/react";
import { Search } from "lucide-react";

const yearStrings = Array.from({ length: 60 }, (_, i) => String(2025 - i));
const yearsCollection = createListCollection({
  items: yearStrings.map((y) => ({ label: y, value: y })),
});

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [year, setYear] = useState<string[]>([]);

  const [submitted, setSubmitted] = useState<{ q: string; year: string | "" }>({
    q: "",
    year: "",
  });

  const { data, isError, error, isFetching, isFetched } = useQuery({
    queryKey: ["search", submitted.q, submitted.year], // when either key changes -> refetch
    queryFn: () => searchMovies(submitted.q, 1, submitted.year),
    enabled: submitted.q.trim().length > 0, // only fetch on mount if input length > 0
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    setSubmitted({ q: trimmed, year: year[0] ?? "" });
  };

  const results = data?.results ?? [];

  return (
    <Container maxW="6xl" py={6}>
      <Heading size="md" mb={4}>
        Search for movies
      </Heading>

      <Box as="form" onSubmit={onSearch} mb={4}>
        <HStack gap={3} align="stretch">
          <InputGroup flex="1" startElement={<Search size={16} />}>
            <Input
              placeholder="Search movies…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </InputGroup>

          <Select.Root
            collection={yearsCollection}
            value={year}
            onValueChange={(details) => setYear(details.value)}
            width="140px"
          >
            <Select.HiddenSelect name="year" />

            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Year" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.ClearTrigger />
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {yearsCollection.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>

          <Button type="submit" colorScheme="blue" disabled={!q.trim()}>
            Search
          </Button>
        </HStack>
      </Box>

      {isFetching && (
        <HStack>
          <Spinner /> <Text>Searching…</Text>
        </HStack>
      )}

      {isError && (
        <Text color="red.500">Error: {(error as Error).message}</Text>
      )}

      {!isFetching && isFetched && results.length === 0 && (
        <Text>No results. Try another search.</Text>
      )}

      {results.length > 0 && (
        <Grid
          templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
          gap={4}
          mt={8}
        >
          {results.map((m) => (
            <GridItem key={m.id}>
              <MovieCard movie={m} />
            </GridItem>
          ))}
        </Grid>
      )}
    </Container>
  );
}
