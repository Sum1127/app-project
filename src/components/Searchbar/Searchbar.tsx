import { useState } from "react";
import axios from "axios";
import { Article } from "@/types/Articles";
import { Box, Input, Button } from "@chakra-ui/react";

interface SearchbarProps {
  setArticles: (articles: Article[]) => void;
}

export default function Searchbar({ setArticles }: SearchbarProps) {
  const [searchKeyword, setSearchKeyword] = useState(""); // 検索キーワード

  async function Search() {
    try {
      const url = "http://127.0.0.1:8000/articles";
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
    <>
      <Box>
        <Input
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="searchKeyword"
        ></Input>
        <Button onClick={Search}>検索</Button>
      </Box>
    </>
  );
}
