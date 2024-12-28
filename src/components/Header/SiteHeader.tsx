import { Box, HStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { GoIntroduction } from "@/components/button/Introductionbutton";
import { GoHomeButton } from "../button/Homebutton";
import { LogoutButton } from "../button/logoutbutton";

export const SiteHeader = () => {
  return (
    <>
      <HStack spacing={10}>
        <Box
          as="header"
          bg="lightgreen"
          w="100%"
          p={6}
          borderRadius="md"
          boxShadow="md"
        >
          <Text color="orange.400" fontSize="3xl" as="b">
            健康まとめサイト　　
          </Text>
          <GoHomeButton />
          <GoIntroduction />
          <LogoutButton />
        </Box>
      </HStack>
    </>
  );
};
