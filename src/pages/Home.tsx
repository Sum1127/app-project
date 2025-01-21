import { TableContainer, Box, VStack, Avatar } from "@chakra-ui/react";
import {
  Th,
  Tr,
  Thead,
  Table,
  Tbody,
  Td,
  Button,
  Flex,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { SiteSidebarLayout } from "@/components/Sidebar/SiteSidebar";
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import { Article } from "@/types/Articles";
import { useRouter } from "next/router";

export default function Home() {
  const [homearticle, sethomeArticle] = useState<Article[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true); // ローディング状態を管理

  async function getArticle() {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + "/articles";
      const res = await axios.get(url);
      sethomeArticle(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <>
      <Head>
        <title>健康まとめサイト</title>
      </Head>
      <Flex direction="column" minHeight="100vh" bg="orange.100">
        <SiteSidebarLayout>
          <VStack width="70vw" justifyContent="center">
            <Box
              bg="orange.400" // ボックスの背景色
              width="60vw" // 幅を画面の50%
              height="80%"
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
                更新情報
              </Text>
            </Box>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>著者</Th>
                    <Th>記事タイトル</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {homearticle.map((res) => (
                    <Tr key={res.id}>
                      <Avatar src={res.user_avatar}></Avatar>
                      <Text>
                        {res.user_name} : {res.user_email}
                      </Text>
                      <Td
                        onClick={() => {
                          router.push(`/showarticles?id=${res.id}`); // id をクエリとして渡す
                        }}
                      >
                        {res.title}
                        <br />
                        {res.tags.map((tag) => (
                          <Tag>
                            <TagLabel>{tag}</TagLabel>
                          </Tag>
                        ))}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </SiteSidebarLayout>
      </Flex>
    </>
  );
}
