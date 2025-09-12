import type { PropsWithChildren } from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

export default function ThemeProvider({ children }: PropsWithChildren) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
