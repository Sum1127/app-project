import { PostUserMemo } from "@/components/UserMemoTable/PostUserMemo";
import { UserMemoTable } from "@/components/UserMemoTable/UserMemoTable";
import MemoSearchbar from "@/components/Searchbar/MemoSearchbar";
import { MemoSidebarLayout } from "@/components/Sidebar/MemoSidebar";
import { useState } from "react";
import { Usermemo } from "@/types/Usermemo";
import { Flex, VStack, Box } from "@chakra-ui/react";
import Head from "next/head";

export default function UserMemo() {
  const [usermemo, setUsermemo] = useState<Usermemo[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  return (
    <>
      <Head>
        <title>メモページ</title>
      </Head>
      <Flex direction="column" minHeight="100vh" bg="orange.100">
        <MemoSidebarLayout
          dates={dates}
          setDates={setDates}
          setUsermemo={setUsermemo}
        >
          <VStack width="80vw" height="100%" justifyContent="center">
            <MemoSearchbar setUsermemo={setUsermemo} />
            <UserMemoTable usermemo={usermemo} setUsermemo={setUsermemo} />
            <Box width="50vw">
              <PostUserMemo usermemo={usermemo} setUsermemo={setUsermemo} />
            </Box>
          </VStack>
        </MemoSidebarLayout>
      </Flex>
    </>
  );
}
