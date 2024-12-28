import React, { ReactNode } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

interface SiteSidebarLayoutProps {
  children: ReactNode;
}

export const SiteSidebarLayout: React.FC<SiteSidebarLayoutProps> = ({
  children,
}) => {
  return (
    <Flex minHeight="100vh">
      {/* 左サイドバー */}
      <Box
        as="aside"
        width={{ base: "20%", md: "30%" }}
        display={{ base: "none", md: "block" }}
        bg="orange.200"
        padding="4"
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold" mb="4">
          左サイドバー
        </Text>
        <Text>リンク1</Text>
        <Text>リンク2</Text>
        <Text>リンク3</Text>
      </Box>

      {/* メインコンテンツ */}
      <Box as="main" flex="1" bg="orange.100" padding="6">
        {children}
      </Box>

      {/* 右サイドバー */}
      <Box
        as="aside"
        width={{ base: "20%", md: "30%" }}
        display={{ base: "none", md: "block" }}
        bg="orange.200"
        padding="4"
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold" mb="4">
          右サイドバー
        </Text>
        <Text>リンク1</Text>
        <Text>リンク2</Text>
        <Text>リンク3</Text>
      </Box>
    </Flex>
  );
};