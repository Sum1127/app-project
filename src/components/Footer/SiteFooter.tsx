import { Box, Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export const SiteFooter = () => {
  return (
    <Flex
      direction="column"
      minHeight="10vh" // ページ全体を画面の高さに合わせる
    >
      <Box
        as="footer"
        bg="lightgreen"
        color="orange"
        textAlign="center"
        padding="8"
        width="100%"
      >
        <Text fontSize="sm">
          &copy; 2024 Your Company. All rights reserved.
        </Text>
      </Box>
    </Flex>
  );
};

export default SiteFooter;
