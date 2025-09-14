import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Toaster } from 'react-hot-toast';
import AppHeader from "./components/common/AppHeader";

export default function App() {
  return (
    <Box>
      <AppHeader />

      <Box as="main" p={4}>
        <Outlet />
      </Box>
      <Toaster />
    </Box>
  );
}
