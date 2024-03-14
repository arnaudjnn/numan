"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme } from "@/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={extendTheme(theme)}>{children}</ChakraProvider>;
}
