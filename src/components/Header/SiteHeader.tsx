import { Box, HStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { GoIntroduction } from "@/components/button/Introductionbutton";
import { GoHomeButton } from "../button/Homebutton";
import { LogoutButton } from "../button/logoutbutton";
import { GoMypageButton } from "../button/mypagebutton";

export const SiteHeader = ({
  showHeaderFooter,
}: {
  showHeaderFooter: boolean;
}) => {
  if (showHeaderFooter) {
    return (
      <>
        <Box
          as="header"
          bg="lightgreen"
          w="100%"
          p={6}
          borderRadius="md"
          boxShadow="md"
        >
          <HStack spacing={4}>
            <Text color="orange.400" fontSize="3xl" as="b">
              健康まとめサイト
            </Text>
            <GoHomeButton />
            <GoIntroduction />
            <GoMypageButton />
            <LogoutButton />
          </HStack>
        </Box>
      </>
    );
  }
  return <></>;
};
