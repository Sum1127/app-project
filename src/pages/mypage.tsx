import Head from "next/head";
import { Flex, VStack, Text } from "@chakra-ui/react";
import { Article } from "@/types/Articles";
import { useState } from "react";
import MyArticleTable from "@/components/table/myarticletable";
import { GoBookMarkButton } from "@/components/button/gobookmarkbutton";

export default function Mypage() {
  const [article, setArticle] = useState<Article[]>([]);

  return (
    <>
      <Head>
        <title>マイページ</title>
      </Head>
      <Flex direction="column" minHeight="100vh" bg="orange.100">
        <VStack width="100vw" height="100%" justifyContent="center">
          <Text fontSize="2xl" as="b">
            マイページ
          </Text>
          <MyArticleTable article={article} setEditArticle={setArticle} />
          <GoBookMarkButton />
        </VStack>
      </Flex>
    </>
  );
}
