import {
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { sessionState } from "@/libs/states";
import { Usermemo } from "@/types/Usermemo";

interface Props {
  usermemo: Usermemo[];
  setUsermemo: (memos: Usermemo[]) => void;
}

export function UserMemoTable(props: Props) {
  const [session] = useRecoilState<Session | null>(sessionState);

  async function Getmemo() {
    try {
      const url = "http://127.0.0.1:8000/usermemo";
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

  async function memoDelete(id: number) {
    try {
      const url = "http://127.0.0.1:8000/usermemo/" + id;
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
              </Tr>
            </Thead>
            <Tbody>
              {props.usermemo.map((res) => (
                <Tr key={res.id}>
                  <Td>{res.title}</Td>
                  <Td>{res.content}</Td>
                  <Button onClick={memoDelete.bind(null, res.id)}>
                    Delete
                  </Button>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </>
  );
}
