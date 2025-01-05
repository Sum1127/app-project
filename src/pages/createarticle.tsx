import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  useToast,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { sessionState } from "@/libs/states";
import { Session } from "@supabase/supabase-js";

const CreateArticle = () => {
  const [session] = useRecoilState<Session | null>(sessionState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const toast = useToast();

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      toast({
        title: "入力エラー",
        description: "タイトルとメインコンテンツを入力してください。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const user_name: string =
        session?.user.user_metadata["name"] ?? "unknown";
      const user_avatar: string =
        session?.user.user_metadata["picture"] ??
        session?.user.user_metadata["avatar_url"] ??
        "";
      const user_email: string =
        session?.user.user_metadata["email"] ?? "unknown";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/createarticles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            tags,
            user_name,
            user_avatar,
            user_email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("記事の作成に失敗しました。");
      }

      toast({
        title: "記事作成成功",
        description: "記事が正常に作成されました。",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTitle("");
      setContent("");
      setTags([]);
    } catch (error) {
      toast({
        title: "エラー",
        description: "記事の作成中に問題が発生しました。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxW="600px" mx="auto">
      <Heading mb={6}>記事作成</Heading>
      <VStack spacing={4}>
        <Input
          placeholder="記事タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="記事のメインコンテンツ"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />
        <HStack>
          <Input
            placeholder="タグを追加"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <Button onClick={handleAddTag}>追加</Button>
        </HStack>
        <HStack wrap="wrap">
          {tags.map((tag) => (
            <Tag key={tag} colorScheme="blue" m={1}>
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveTag(tag)} />
            </Tag>
          ))}
        </HStack>
        <Button colorScheme="teal" w="100%" onClick={handleSubmit}>
          作成
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateArticle;
