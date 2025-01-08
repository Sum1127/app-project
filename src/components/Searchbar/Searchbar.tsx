import { useState } from "react";
import axios from "axios";
import { Article } from "@/types/Articles";
import { Box, Input, Button, HStack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

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
  const [isLoading, setisLoading] = useState(false);

  async function Search() {
    try {
      setisLoading(true);
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
    } finally {
      setisLoading(false);
    }
  }

  return (
    <Box height={height} width={width}>
      <HStack spacing={2}>
        <Input
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="タイトル検索"
        />
        <Button
          isLoading={isLoading}
          colorScheme="green"
          leftIcon={<FaSearch />}
          onClick={Search}
        >
          検索
        </Button>
      </HStack>
    </Box>
  );
}
