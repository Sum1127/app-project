import { Article } from "@/types/Articles";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { sessionState } from "@/libs/states";
import { useRouter } from "next/router";
import {
  Table,
  TableContainer,
  Th,
  Tr,
  Thead,
  Td,
  VStack,
  Tbody,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

interface EditArticleProps {
  article: Article[];
  setEditArticle: (article: Article[]) => void;
}

export default function MyArticleTable(editarticleprops: EditArticleProps) {
  const router = useRouter();
  const [session] = useRecoilState<Session | null>(sessionState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  async function getArticle() {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/mypage`;
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
      editarticleprops.setEditArticle(res.data as Article[]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const init = async () => {
      await getArticle();
    };
    init();
  }, []);

  async function deleteArticle(id: number) {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`;
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
      const newItems = editarticleprops.article.filter((i) => i.id !== id);
      editarticleprops.setEditArticle(newItems);
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
        <TableContainer>
          <Table variant="simple" layout="fixed">
            <Thead>
              <Tr>
                <Th>タイトル</Th>
              </Tr>
            </Thead>
            <Tbody>
              {editarticleprops.article.map((res) => (
                <Tr key={res.id}>
                  <Td
                    isTruncated
                    maxWidth={0}
                    overflowX="hidden"
                    onClick={() => {
                      router.push(`/showarticles?id=${res.id}`); // id をクエリとして渡す
                    }}
                  >
                    {res.title}
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        router.push(`editarticle?id=${res.id}`);
                      }}
                      leftIcon={<FaRegEdit />}
                      colorScheme="green"
                    >
                      記事編集
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={deleteArticle.bind(null, res.id)}
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
