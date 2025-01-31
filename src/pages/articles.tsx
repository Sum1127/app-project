import axios from "axios";
import { useEffect, useState } from "react";
import { Article } from "@/types/Articles";
import { TableContainer, Box, VStack, TagLabel, Tag } from "@chakra-ui/react";
import {
  Th,
  Tr,
  Thead,
  Table,
  Tbody,
  Td,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true); // ローディング状態を管理

  async function getArticle(tags?: undefined | string[]) {
    try {
      setIsLoading(true);
      let url = "";
      if (tags === undefined) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/articles`;
      } else {
        url = `${process.env.NEXT_PUBLIC_API_URL}/articles?tags=${tags.toString()}`;
      }
      const res = await axios.get(url);
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getArticle();
  }, []);

  if (isLoading) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="orange.100"
      >
        <Text fontSize="xl" color="orange.600">
          読み込み中
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Head>
        <title>記事一覧</title>
      </Head>
      <Flex direction="column" minHeight="100vh" bg="orange.100">
        <VStack width="100vw" height="100%" justifyContent="center">
          <Searchbar setArticles={setArticles} height="10%" width="60%" />
          <Box
            bg="orange.100" // ボックスの背景色
            width="60%" // 幅を画面の60%
            height="90%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            flex="1"
          >
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>tags</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {articles.map((res) => (
                    <Tr key={res.id}>
                      <Td>{res.title}</Td>
                      <Td>
                        {res.tags.map((tag) => (
                          <Tag
                            key={tag}
                            onClick={() => {
                              getArticle([tag]);
                            }}
                          >
                            <TagLabel>{tag}</TagLabel>
                          </Tag>
                        ))}
                      </Td>
                      <Td>
                        <Button
                          onClick={() => {
                            router.push(`/showarticles?id=${res.id}`); // id をクエリとして渡す
                          }}
                          colorScheme="orange"
                          color="White"
                        >
                          記事を閲覧する
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
      </Flex>
    </>
  );
}
