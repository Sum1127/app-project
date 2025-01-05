import { useState } from "react";
import axios from "axios";
import { Article } from "@/types/Articles";
import { Box, Input, Button, HStack } from "@chakra-ui/react";

interface SearchbarProps {
  height?: string;
  width?: string;
  setArticles: (articles: Article[]) => void;
}

export default function Searchbar({
  height,
  width,
  setArticles,
}: SearchbarProps) {
  const [searchKeyword, setSearchKeyword] = useState(""); // 検索キーワード

  async function Search() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/articles`;
      if (searchKeyword === "") {
        const res = await axios.get(url);
        setArticles(res.data);
      } else {
        const res = await axios.get(`${url}?title=${searchKeyword}`);
        setArticles(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box height={height} width={width}>
      <HStack spacing={2}>
        <Input
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="searchKeyword"
        />
        <Button onClick={Search}>検索</Button>
      </HStack>
    </Box>
  );
}
