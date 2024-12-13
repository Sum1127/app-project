import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export const SiteHeader = () => {
  return (
    <>
      <Box as="header" bg="lightgreen" w="100%" p={6}>
        <Text color="orange.400" fontSize="3xl" as="b">
          健康まとめサイト
        </Text>
      </Box>
    </>
  );
};
