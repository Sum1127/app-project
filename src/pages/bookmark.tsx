import { Flex, VStack } from "@chakra-ui/react";
import MyBookMarkTable from "@/components/table/mybookmarktable";
import { useState } from "react";
import Head from "next/head";
import { BookMark } from "@/types/BookMark";

export default function Bookmark() {
  const [bookmark, setbookmark] = useState<BookMark[]>([]);
  return (
    <>
      <Head>
        <title>お気に入りページ</title>
      </Head>
      <Flex direction="column" minHeight="100vh" bg="orange.100">
        <VStack width="100vw" height="100%" justifyContent="center">
          <MyBookMarkTable bookmark={bookmark} setBookMark={setbookmark} />
        </VStack>
      </Flex>
    </>
  );
}
