import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { BookMark } from "@/types/BookMark";
import { Session } from "@supabase/supabase-js";
import { useRecoilState } from "recoil";
import { sessionState } from "@/libs/states";
import { FaRegStar } from "react-icons/fa";

interface BookMarkProps {
  bookmark: BookMark[];
  setBookMark: (bookmark: BookMark[]) => void;
}

export function BookMarkButton({ bookmark, setBookMark }: BookMarkProps) {
  // const[bookmark,setbookmark]=useState<BookMark[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setisLoading] = useState(false);
  const [session] = useRecoilState<Session | null>(sessionState);

  async function postArticle(article_id: number) {
    try {
      setisLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/mypage/bookmark/${article_id}`;
      const config = {
        headers: {
          // FIXME: Need to use 〇〇〇
          Authorization: `Bearer ${session?.user.id}`,
        },
      };
      const data = {
        article_id: id,
      };
      const res = await axios.post(url, data, config);
      setBookMark([...bookmark, res.data as BookMark]);
    } catch (err) {
      console.error(err);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <>
      <Button
        colorScheme="green"
        color="white"
        leftIcon={<FaRegStar />}
        // onClick={()=>(postArticle(res.id))}
        alignSelf="flex-end"
      >
        お気に入り登録
      </Button>
    </>
  );
}
