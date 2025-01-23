import { BookMark } from "@/types/BookMark";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { sessionState } from "@/libs/states";
import { useRouter } from "next/router";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  VStack,
  Button,
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Box,
  Tbody,
  Text,
  Flex,
} from "@chakra-ui/react";

interface BookMarkTableProps {
  bookmark: BookMark[];
  setBookMark: (bookmark: BookMark[]) => void;
}

export default function MyBookMarkTable({
  bookmark,
  setBookMark,
}: BookMarkTableProps) {
  const [session] = useRecoilState<Session | null>(sessionState);
  const router = useRouter();
  const [isLoading, setisLoading] = useState<boolean>(true);
  async function getMyBookMarkTable() {
    try {
      setisLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/mypage/bookmark`;
      const config = {
        headers: {
          // FIXME: Need to use 〇〇〇
          Authorization: `Bearer ${session?.user.id}`,
        },
      };
      const res = await axios.get(url, config);
      if (res.status !== 200) {
        throw new Error("Failed to fetch items");
      }
      setBookMark(res.data as BookMark[]);
    } catch (err) {
      console.error(err);
    } finally {
      setisLoading(false);
    }
  }
  useEffect(() => {
    const init = async () => {
      await getMyBookMarkTable();
    };
    init();
  }, []);

  async function deleteMyBookMarkTable(id: number) {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/mypage/bookmark/${id}`;
      const config = {
        headers: {
          // FIXME: Need to use 〇〇〇
          Authorization: `Bearer ${session?.user.id}`,
        },
      };
      const res = await axios.delete(url, config);
      if (res.status !== 200) {
        throw new Error("Failed to delete item");
      }
      const newItems = bookmark.filter((i) => i.id !== id);
      setBookMark(newItems);
    } catch (err) {
      console.error(err);
    }
  }

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
      <VStack>
        <Text fontSize="2xl" as="b">
          お気に入りページ
        </Text>
        <TableContainer>
          <Table variant="simple" layout="fixed">
            <Thead>
              <Th>タイトル</Th>
            </Thead>
            <Tbody>
              {bookmark.map((res) => (
                <Tr key={res.id}>
                  <Td>{res.article.title}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        router.push(`/showarticles?id=${res.article_id}`); // id をクエリとして渡す
                      }}
                      colorScheme="orange"
                      color="White"
                    >
                      記事を閲覧する
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={deleteMyBookMarkTable.bind(null, res.id)}
                      colorScheme="red"
                      leftIcon={<FaRegTrashCan />}
                    >
                      削除
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </>
  );
}
