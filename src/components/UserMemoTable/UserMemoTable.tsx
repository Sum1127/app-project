import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

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
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Content</Th>
                <Th>作成日時</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {props.usermemo.map((res) => (
                <Tr key={res.id}>
                  <Td>{res.title}</Td>
                  <Td>{res.content}</Td>
                  <Td onClick={GetDateMemo.bind(null, res.created_at)}>
                    {convertISOtoDate(res.created_at)}
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        router.push(`editusermemo?id=${res.id}`);
                      }}
                    >
                      編集
                    </Button>
                  </Td>
                  <Td>
                    <Button onClick={memoDelete.bind(null, res.id)}>
                      Delete
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

function convertISOtoDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString();
}
