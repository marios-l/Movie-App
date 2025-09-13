import { Box, Button, Flex, Link, Span } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { Clapperboard, LogOut } from "lucide-react";

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
        <Link
          href="/"
          fontWeight="semibold"
          color="white"
          _hover={{ textDecoration: "none" }}
        >
          <Clapperboard />
          <Span fontSize={{ base: 20, md: 24 }}>Movie App</Span>
        </Link>

        {user && (
          <Button colorPalette="yellow" onClick={() => logout()}>
            <Span display={{ base: "none", md: "block" }}>Logout</Span>{" "}
            <LogOut />
          </Button>
        )}
      </Flex>
    </Box>
  );
}

export default AppHeader;
