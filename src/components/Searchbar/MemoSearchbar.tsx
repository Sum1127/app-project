import { useState } from "react";
import axios from "axios";
import { Usermemo } from "@/types/Usermemo";
import { Input, Button, HStack } from "@chakra-ui/react";
import { sessionState } from "@/libs/states";
import { useRecoilState } from "recoil";
import { Session } from "@supabase/supabase-js";
import { FaSearch } from "react-icons/fa";

interface MemoSearchbarProps {
  setUsermemo: (searchmemo: Usermemo[]) => void;
}

export default function MemoSearchbar({ setUsermemo }: MemoSearchbarProps) {
  const [session] = useRecoilState<Session | null>(sessionState);
  const [searchMemoKeyword, setsearchMemoKeyword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function MemoSearch() {
    try {
      setisLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/usermemo`;
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
    } finally {
      setisLoading(false);
    }
  }

  return (
    <>
      <HStack>
        <Input
          value={searchMemoKeyword}
          onChange={(e) => setsearchMemoKeyword(e.target.value)}
          placeholder="searchMemoKeyword"
        />
        <Button
          isLoading={isLoading}
          colorScheme="green"
          leftIcon={<FaSearch />}
          onClick={MemoSearch}
        >
          検索
        </Button>
      </HStack>
    </>
  );
}
