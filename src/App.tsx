import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import AppHeader from "./components/common/AppHeader";

export default function App() {
  return (
    <Box margin="auto" maxW="1400px">
      <AppHeader />

      <Box as="main" p={4}>
        <Outlet />
      </Box>
    </Box>
  );
}
