import { Box, Flex, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

import { SiteSidebarLayout } from "@/components/Sidebar/SiteSidebar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>このサイトについて</title>
      </Head>
      <Flex direction="column" minHeight="100vh" bg="orange.100">
        <SiteSidebarLayout>
          <VStack width="70vw" height="25vh" justifyContent="center">
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
                このサイトについて
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
              <Text>
                このサイトでは、健康にまつわる内容を様々な種類取り扱います。
                目的に合わせて運動についてまとめたページや、食事メニューについてまとめたページがあります。
                その日に行った運動や食事などについて各々でメモすることもできます。このサイトを活用することで
                健康的な体を手に入れることができるようにしたいと思っています。
              </Text>
            </Box>
          </VStack>
        </SiteSidebarLayout>
      </Flex>
    </>
  );
}
