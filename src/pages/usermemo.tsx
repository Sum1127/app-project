import { PostUserMemo } from "@/components/UserMemoTable/PostUserMemo";
import { UserMemoTable } from "@/components/UserMemoTable/UserMemoTable";
import MemoSearchbar from "@/components/Searchbar/MemoSearchbar";
import { useState } from "react";
import { Usermemo } from "@/types/Usermemo";
import { Center, Flex, VStack } from "@chakra-ui/react";

export default function UserMemo() {
  const [usermemo, setUsermemo] = useState<Usermemo[]>([]);
  return (
    <>
      <Flex direction="column" minHeight="100vh" bg="orange.100">
        <Center display="flex">
          <MemoSearchbar setUsermemo={setUsermemo} />
          <UserMemoTable usermemo={usermemo} setUsermemo={setUsermemo} />
          <PostUserMemo usermemo={usermemo} setUsermemo={setUsermemo} />
        </Center>
      </Flex>
    </>
  );
}
