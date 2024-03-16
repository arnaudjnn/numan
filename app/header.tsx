import { Logo } from "@/components/assets/logo";
import { Box, Flex } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Header() {
  return (
    <Box as="header" position="static" bg="black">
      <Flex height="80px" alignItems="center" justifyContent="center">
        <NextLink href="/">
          <Logo color="white" height="40px" width="auto" />
        </NextLink>
      </Flex>
    </Box>
  );
}
