import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { sessionState } from "@/libs/states";
import { Usermemo } from "@/types/Usermemo";
import { useRouter } from "next/router";

interface Props {
  usermemo: Usermemo[];
  setUsermemo: (memos: Usermemo[]) => void;
}

export function UserMemoTable(props: Props) {
  const router = useRouter();
  const [session] = useRecoilState<Session | null>(sessionState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedIdx, setselectedIdx] = useState(0);

  async function Getmemo() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/usermemo`;
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
      props.setUsermemo(res.data as Usermemo[]);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const init = async () => {
      await Getmemo();
    };
    init();
  }, []);

  async function GetDateMemo(date: string) {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/usermemo?created_at=${date}`;
      const config = {
        headers: {
          Authorization: `Bearer ${session?.user.id}`,
        },
      };
      const res = await axios.get(url, config);
      if (res.status !== 200) {
        throw new Error("Failed to fetch items");
      }
      props.setUsermemo(res.data as Usermemo[]);
    } catch (err) {
      console.error(err);
    }
  }

  function onRowClick(idx: number) {
    setselectedIdx(idx);
    onOpen();
  }

  // async function memoPut(id: number) {
  //   try {
  //     const url = `${process.env.NEXT_PUBLIC_API_URL}/usermemo/${id}`;
  //     const body = {
  //       title: "ここにタイトル",
  //       content: "ここにコンテンツ",
  //     };
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${session?.user.id}`,
  //       },
  //     };
  //     const res = await axios.put(url, body, config);
  //     const newMemos = props.usermemo.map((i) => {
  //       if (i.id === id) {
  //         return res.data;
  //       }
  //       return i;
  //     });
  //     props.setUsermemo(newMemos);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  async function memoDelete(id: number) {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/usermemo/${id}`;
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
      const newItems = props.usermemo.filter((i) => i.id !== id);
      props.setUsermemo(newItems);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <VStack>
        <TableContainer>
          <Table variant="simple" layout="fixed">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Content</Th>
                <Th>作成日時</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {props.usermemo.map((res, idx) => (
                <Tr key={res.id}>
                  <Td
                    isTruncated
                    maxWidth={0}
                    overflowX="hidden"
                    onClick={() => onRowClick(idx)}
                  >
                    {res.title}
                  </Td>
                  <Td
                    isTruncated
                    maxWidth={0}
                    overflowX="hidden"
                    onClick={() => onRowClick(idx)}
                  >
                    {res.content}
                  </Td>
                  <Td onClick={() => onRowClick(idx)}>
                    {convertISOtoDate(res.created_at)}
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        router.push(`editusermemo?id=${res.id}`);
                      }}
                      leftIcon={<FaRegEdit />}
                      colorScheme="green"
                    >
                      編集
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={memoDelete.bind(null, res.id)}
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
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {props.usermemo.length === 0
              ? ""
              : props.usermemo[selectedIdx].title}
          </ModalHeader>
          <ModalBody maxH={300} overflowY="auto">
            <Box whiteSpace="pre-line">
              {props.usermemo.length === 0
                ? ""
                : props.usermemo[selectedIdx].content}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function convertISOtoDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString();
}
