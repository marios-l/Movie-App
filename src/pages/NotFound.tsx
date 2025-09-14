import { Button, Container, EmptyState, VStack } from "@chakra-ui/react";
import { BadgeX } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
  return (
    <Container maxW="6xl" py={2} px={0}>
      <EmptyState.Root
          mt={10}
          marginInline="auto"
          borderRadius="sm"
          width="fit-content"
          shadow="xl"
        >
          <EmptyState.Content>
            <EmptyState.Indicator>
              <BadgeX color="firebrick" />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>Error 404</EmptyState.Title>
              <EmptyState.Description>
                Sorry, the page you requested was not found.
              </EmptyState.Description>
            </VStack>
            <RouterLink to="/">
              <Button variant="outline">Home</Button>
            </RouterLink>
          </EmptyState.Content>
        </EmptyState.Root>
      </Container>
  );
}
