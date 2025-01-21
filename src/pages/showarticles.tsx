import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Article } from "@/types/Articles";
import { FaRegStar } from "react-icons/fa";
import {
  Box,
  Flex,
  VStack,
  Text,
  HStack,
  Avatar,
  ComponentDefaultProps,
  UnorderedList,
  ListItem,
  OrderedList,
  Button,
} from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import { useRecoilState } from "recoil";
import { sessionState } from "@/libs/states";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import Comments from "@/components/Comments/Comments";
import Head from "next/head";
import { BookMark } from "@/types/BookMark";

interface BookMarkProps {
  bookmark: BookMark[];
  setBookMark: (bookmark: BookMark[]) => void;
}

export default function ShowArticles({ bookmark, setBookMark }: BookMarkProps) {
  const router = useRouter();
  const { id } = router.query; // URLのクエリパラメータからIDを取得
  const [article, setArticle] = useState<Article | null>(null); // 記事データを管理
  const [isLoading, setIsLoading] = useState<boolean>(true); // ローディング状態を管理
  const [session] = useRecoilState<Session | null>(sessionState);

  async function postArticle(article_id: number) {
    try {
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
    }
  }

  const newTheme = {
    p: (props: ComponentDefaultProps) => {
      const { children } = props;
      return <Text px={4}>{children}</Text>;
    },
    ul: (props: ComponentDefaultProps) => {
      const { children } = props;
      return <UnorderedList>{children}</UnorderedList>;
    },
    ol: (props: ComponentDefaultProps) => {
      const { children } = props;
      return <OrderedList>{children}</OrderedList>;
    },
    li: (props: ComponentDefaultProps) => {
      const { children } = props;
      return <ListItem>{children}</ListItem>;
    },
  };

  useEffect(() => {
    async function fetchArticle() {
      try {
        if (!id) return; // `id` が存在しない場合は処理しない
        const url = `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`;
        const res = await axios.get(url);
        setArticle(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); // ローディング完了
      }
    }

    fetchArticle();
  }, [id]);

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

  if (!article) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="orange.100"
      >
        <Text fontSize="xl" color="orange.600">
          記事が見つかりませんでした。
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <VStack
        width="100%"
        height="120vh"
        justifyContent="center"
        bg="orange.100"
      >
        <HStack alignSelf={"flex-start"}>
          <Avatar size={"sm"} src={article.user_avatar} />
          <Text>
            {article.user_name} : {article.user_email}
          </Text>
        </HStack>
        <Box
          bg="orange.400"
          width="60%"
          height="5%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          borderRadius="md"
          color="white"
          boxShadow="md"
        >
          <Text fontSize="xl" as="b">
            {article.title}
          </Text>
        </Box>
        <Box
          whiteSpace="pre-line"
          width="60%"
          height="60%"
          overflowY="auto"
          px={4}
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
        >
          <ReactMarkdown
            remarkPlugins={[[remarkGfm]]}
            components={ChakraUIRenderer(newTheme)}
            skipHtml
          >
            {article.content}
          </ReactMarkdown>
        </Box>
        ;
        {/* <Text
          whiteSpace="pre-line"
          width="60%"
          height="60%"
          overflowY="auto"
          px={4}
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
        >
          {article.content}
        </Text> */}
        <Comments articleId={article.id} height="30%" width="60%" />
        <Button
          colorScheme="green"
          color="white"
          leftIcon={<FaRegStar />}
          onClick={() => postArticle(article.id)}
          alignSelf="flex-end"
        >
          お気に入り登録
        </Button>
      </VStack>
    </>
  );
}
