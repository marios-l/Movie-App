import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../api/tmdb";
import MovieCard from "../../components/movie/MovieCard";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Input,
  Spinner,
  Text,
  Select,
  Portal,
  createListCollection,
  InputGroup,
  Pagination,
} from "@chakra-ui/react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";

const PAGE_SIZE = 20; // tmdb page size
const MAX_TOTAL_PAGES = 500; // tmdb max pages
const TMDB_MAX_RESULTS = MAX_TOTAL_PAGES * PAGE_SIZE;

const yearStrings = Array.from({ length: 60 }, (_, i) => String(2025 - i));
const yearsCollection = createListCollection({
  items: yearStrings.map((y) => ({ label: y, value: y })),
});

export default function SearchPage() {
  const { toggle, isFavorite } = useFavorites();
  const [q, setQ] = useState("");
  const [year, setYear] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [submitted, setSubmitted] = useState<{ q: string; year: string | "" }>({
    q: "",
    year: "",
  });

  const { data, isError, error, isFetching, isFetched } = useQuery({
    queryKey: ["search", submitted.q, submitted.year, currentPage],
    queryFn: () => searchMovies(submitted.q, currentPage, submitted.year),
    enabled: submitted.q.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    setCurrentPage(1);
    setSubmitted({ q: trimmed, year: year[0] ?? "" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [q]);

  const results = data?.results ?? [];
  const totalResults = Math.min(data?.total_results ?? 0, TMDB_MAX_RESULTS);
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);
  const hasPages = totalResults > PAGE_SIZE;

  const pageItems = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, i) => {
        const label = String(i + 1);
        return { label, value: label };
      }),
    [totalPages]
  );

  const pagesCollection = useMemo(
    () => createListCollection({ items: pageItems }),
    [pageItems]
  );

  const PageSelect = () => (
    <Select.Root
      collection={pagesCollection}
      value={[String(currentPage)]}
      onValueChange={(details) => {
        const pageSelected = Number(details.value[0]);
        if (!Number.isNaN(pageSelected) && pageSelected !== currentPage) {
          setCurrentPage(pageSelected);
          window?.scrollTo?.({ top: 0, behavior: "smooth" });
        }
      }}
      size="xs"
      variant="subtle"
      width="80px"
    >
      <Select.HiddenSelect name="page" />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Page" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content>
            {pagesCollection.items.map((item) => (
              <Select.Item key={item.value} item={item}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );

  const YearSelect = () => (
    <Select.Root
      collection={yearsCollection}
      value={year}
      onValueChange={(details) => setYear(details.value)}
      size="xs"
      variant="subtle"
      width="85px"
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
  );

  return (
    <Container maxW="6xl" py={2} px={0}>
      <Heading size="md" mb={2}>
        Search for movies
      </Heading>

      <Box as="form" onSubmit={onSearch} mb={4}>
        <HStack gap={1.5} align="stretch">
          <InputGroup
            flex="1"
            startElement={<Search size={16} />}
            endElement={<YearSelect />}
          >
            <Input
              placeholder="Search movies…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </InputGroup>

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
        <>
          <Grid
            templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
            gap={4}
            mt={8}
          >
            {results.map((m) => (
              <GridItem key={m.id}>
                <MovieCard
                  movie={m}
                  onToggleFavorite={() => toggle(m)}
                  isFavorite={isFavorite(m.id)}
                />
              </GridItem>
            ))}
          </Grid>

          {hasPages && (
            <HStack justify="center" mt={8}>
              <Pagination.Root
                count={totalResults}
                pageSize={PAGE_SIZE}
                page={currentPage}
                onPageChange={(e) => {
                  setCurrentPage(e.page);
                  window?.scrollTo?.({ top: 0, behavior: "smooth" });
                }}
                siblingCount={1}
              >
                <ButtonGroup variant="ghost" size="sm">
                  <Pagination.PrevTrigger asChild>
                    <IconButton aria-label="Previous page">
                      <ChevronLeft />
                    </IconButton>
                  </Pagination.PrevTrigger>

                  <Pagination.Items
                    render={(p) => (
                      <IconButton
                        variant={{ base: "ghost", _selected: "outline" }}
                      >
                        {p.value}
                      </IconButton>
                    )}
                  />

                  <Pagination.NextTrigger asChild>
                    <IconButton aria-label="Next page">
                      <ChevronRight />
                    </IconButton>
                  </Pagination.NextTrigger>
                </ButtonGroup>
              </Pagination.Root>

              {totalPages > 10 && <PageSelect />}
            </HStack>
          )}
        </>
      )}
    </Container>
  );
}
