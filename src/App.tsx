import { Outlet } from "react-router-dom";
import { Box, Flex, Link } from "@chakra-ui/react";

export default function App() {
  return (
    <Box>
      <Flex
        as="header"
        px={4}
        py={3}
        borderBottom="1px solid"
        borderColor="gray.200"
        align="center"
      >
        <Link
          href="/"
          fontWeight="semibold"
          _hover={{ textDecoration: "none", color: "teal.500" }}
        >          
        </Link>
      </Flex>

      <Box as="main" p={4}>
        <Outlet />
      </Box>
    </Box>
  );
}
