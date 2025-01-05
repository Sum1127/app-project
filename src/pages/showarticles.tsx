import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Article } from "@/types/Articles";
import { Box, Flex, VStack, Text, HStack, Avatar } from "@chakra-ui/react";
import Comments from "@/components/Comments/Comments";

export default function ShowArticles() {
  const router = useRouter();
  const { id } = router.query; // URLのクエリパラメータからIDを取得
  const [article, setArticle] = useState<Article | null>(null); // 記事データを管理
  const [isLoading, setIsLoading] = useState<boolean>(true); // ローディング状態を管理

  useEffect(() => {
    async function fetchArticle() {
      try {
        if (!id) return; // `id` が存在しない場合は処理しない
        const url = `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`;
        const res = await axios.get(url);
        setArticle(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); // ローディング完了
      }
    }

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="orange.100"
      >
        <Text fontSize="xl" color="orange.600">
          Loading...
        </Text>
      </Flex>
    );
  }

  if (!article) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="orange.100"
      >
        <Text fontSize="xl" color="orange.600">
          Article not found.
        </Text>
      </Flex>
    );
  }

  return (
    <VStack width="100%" height="120vh" justifyContent="center" bg="orange.100">
      <HStack alignSelf={"flex-start"}>
        <Avatar size={"sm"} src={article.user_avatar} />
        <Text>
          {article.user_name} : {article.user_email}
        </Text>
      </HStack>
      <Box
        bg="orange.400"
        width="60%"
        height="5%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        borderRadius="md"
        boxShadow="md"
      >
        <Text fontSize="xl" as="b">
          {article.title}
        </Text>
      </Box>
      <Text
        whiteSpace="pre-line"
        width="60%"
        height="60%"
        overflowY="scroll"
        px={4}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
      >
        {article.content}
      </Text>
      <Comments articleId={article.id} height="30%" width="60%" />
    </VStack>
  );
}
