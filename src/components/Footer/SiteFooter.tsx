import { Box, Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { BsBox2HeartFill } from "react-icons/bs";

export const SiteFooter = () => {
  return (
    <Box
      as="footer"
      bg="lightgreen"
      color="orange"
      textAlign="center"
      padding="8"
      width="100%"
    >
      <Text fontSize="sm">&copy; 2024 Your Company. All rights reserved.</Text>
    </Box>
  );
};

export default SiteFooter;
