import { useRecoilState } from "recoil";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { sessionState } from "@/libs/states";
import { Input, FormLabel, Button, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function EditUserMemo() {
  const router = useRouter();
  const { id } = router.query;

  const [session] = useRecoilState<Session | null>(sessionState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function memoGet() {
    try {
      setisLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/usermemo/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${session?.user.id}`,
        },
      };
      const res = await axios.get(url, config);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.error(err);
    } finally {
      setisLoading(false);
    }
  }

  async function memoPut() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/usermemo/${id}`;
      const body = {
        title: title,
        content: content,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${session?.user.id}`,
        },
      };
      const res = await axios.put(url, body, config);
    } catch (err) {
      console.error(err);
    } finally {
      router.push("/usermemo");
    }
  }

  useEffect(() => {
    memoGet();
  }, []);

  return (
    <>
      <Head>
        <title>メモ編集</title>
      </Head>
      <Flex direction="column" minHeight="100vh" bg="orange.100">
        <FormLabel>Title</FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <FormLabel>Content</FormLabel>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        ></Input>
        <Button
          isLoading={isLoading}
          loadingText="更新中…"
          colorScheme="green"
          color="white"
          width="10vw"
          alignSelf="flex-end"
          onClick={memoPut}
        >
          更新
        </Button>
      </Flex>
    </>
  );
}
