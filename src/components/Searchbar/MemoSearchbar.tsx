import { useState } from "react";
import axios from "axios";
import { Usermemo } from "@/types/Usermemo";
import { Box, Input, Button } from "@chakra-ui/react";
import { sessionState } from "@/libs/states";
import { useRecoilState } from "recoil";
import { Session } from "@supabase/supabase-js";

interface MemoSearchbarProps {
  setUsermemo: (searchmemo: Usermemo[]) => void;
}

export default function MemoSearchbar({ setUsermemo }: MemoSearchbarProps) {
  const [session] = useRecoilState<Session | null>(sessionState);
  const [searchMemoKeyword, setsearchMemoKeyword] = useState("");

  async function MemoSearch() {
    try {
      const url = "http://127.0.0.1:8000/usermemo";
      const config = {
        headers: {
          // FIXME: Need to use 〇〇〇
          Authorization: `Bearer ${session?.user.id}`,
        },
      };
      if (searchMemoKeyword === "") {
        const res = await axios.get(url, config);
        setUsermemo(res.data);
      } else {
        const res = await axios.get(
          `${url}?title=${searchMemoKeyword}`,
          config
        );
        setUsermemo(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Box>
        <Input
          value={searchMemoKeyword}
          onChange={(e) => setsearchMemoKeyword(e.target.value)}
          placeholder="searchMemoKeyword"
        ></Input>
        <Button onClick={MemoSearch}>検索</Button>
      </Box>
    </>
  );
}
