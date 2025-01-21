import { useRecoilState } from "recoil";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { sessionState } from "@/libs/states";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Input,
  FormLabel,
  Button,
  Flex,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Textarea,
} from "@chakra-ui/react";
import Head from "next/head";

export default function EditArticle() {
  const router = useRouter();
  const { id } = router.query;

  const [session] = useRecoilState<Session | null>(sessionState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setisLoading] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  async function getArticle() {
    try {
      setisLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${session?.user.id}`,
        },
      };
      const res = await axios.get(url, config);
      setTitle(res.data.title);
      setContent(res.data.content);
      setTags(res.data.tags);
    } catch (err) {
      console.error(err);
    } finally {
      setisLoading(false);
    }
  }

  async function putArticle() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`;
      const body = {
        title: title,
        content: content,
        tags: tags,
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
      router.push("/mypage");
    }
  }

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <>
      <Head>
        <title>記事編集</title>
      </Head>
      <Flex direction="column" minHeight="100vh" bg="orange.100">
        <FormLabel>記事のタイトル</FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <FormLabel>記事のコンテンツ</FormLabel>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        ></Textarea>
        <FormLabel>タグ</FormLabel>
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Tags"
        ></Input>
        <Button
          colorScheme="green"
          color="white"
          width="10vw"
          alignSelf="flex-end"
          onClick={handleAddTag}
        >
          追加
        </Button>
        <HStack wrap="wrap">
          {tags.map((tag) => (
            <Tag key={tag} colorScheme="blue" m={1}>
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveTag(tag)} />
            </Tag>
          ))}
        </HStack>
        <Button
          isLoading={isLoading}
          loadingText="更新中…"
          colorScheme="green"
          color="white"
          width="10vw"
          alignSelf="flex-end"
          onClick={putArticle}
        >
          更新
        </Button>
      </Flex>
    </>
  );
}
