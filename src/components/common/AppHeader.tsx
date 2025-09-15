import { Box, Button, Flex, Group, Link, Span, Stack } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { Clapperboard, Heart, LogOut } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <Box backgroundColor="#032541">
      <Flex
        as="header"
        px={6}
        py={4}
        align="center"
        justifyContent="space-between"
        marginInline="auto"
        maxW="1600px"
      >
        <Group>
          <Link
            href="/"
            fontWeight="semibold"
            color="white"
            _hover={{ textDecoration: "none" }}
          >
            <Clapperboard />
            <Span fontSize={{ base: 20, md: 24 }}>Movie App</Span>
          </Link>
        </Group>

        {user && (
          <Group gap={10}>
            <RouterLink to="/favorites">
              <Stack alignItems="center" gap={0}>
                <Heart fill="white" color="white" />
                <Span fontSize={12} fontWeight={500} color="white">
                  MY FAVORITES
                </Span>
              </Stack>
            </RouterLink>
            <Button colorPalette="yellow" onClick={() => logout()}>
              <Span display={{ base: "none", md: "block" }}>Logout</Span>{" "}
              <LogOut />
            </Button>
          </Group>
        )}
      </Flex>
    </Box>
  );
}

export default AppHeader;
