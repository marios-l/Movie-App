import { Button, Flex, Link, Span } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { Clapperboard, LogOut } from "lucide-react";

function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <Flex
      as="header"
      px={6}
      py={4}
      align="center"
      justifyContent="space-between"
      backgroundColor="#032541"
    >
      <Link
        href="/"
        fontWeight="semibold"
        color="white"
        _hover={{ textDecoration: "none" }}
      >
        <Clapperboard display={'none'} />
        <Span fontSize={28}>Movie App</Span>
      </Link>

      {user && (
        <Button colorPalette="yellow" onClick={() => logout()}>
          <Span display={{ base: "none", md: "block" }}>Logout</Span> <LogOut />
        </Button>
      )}
    </Flex>
  );
}

export default AppHeader;
