import { Box, Flex, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { SiteSidebarLayout } from "@/components/Sidebar/SiteSidebar";

export default function Home() {
  return (
    <>
      <Flex direction="column" minHeight="100vh" bg="orange.100">
        <SiteSidebarLayout>
          <VStack width="85vw" height="30vh" justifyContent="center">
            <Box
              bg="orange.400" // ボックスの背景色
              width="50vw" // 幅を画面の50%
              height="30vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              textAlign="center"
              borderRadius="md"
              boxShadow="md"
              flex="1"
            >
              <Text color="white" fontSize="xl" as="b">
                題名
              </Text>
            </Box>
            <Box
              as="main"
              width="50vw" // 幅を画面の50%
              height="35vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="black"
              flex="1"
            >
              <Text>テスト</Text>
            </Box>
          </VStack>
        </SiteSidebarLayout>
      </Flex>
    </>
  );
}
