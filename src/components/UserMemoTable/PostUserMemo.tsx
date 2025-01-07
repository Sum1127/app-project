import { Button, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { sessionState } from "@/libs/states";
import { Usermemo } from "@/types/Usermemo";

interface Props {
  usermemo: Usermemo[];
  setUsermemo: (usermemo: Usermemo[]) => void;
}

export function PostUserMemo({ usermemo, setUsermemo }: Props) {
  const [session] = useRecoilState<Session | null>(sessionState);

  const [id, setID] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function postusermemo() {
    try {
      setisLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/usermemo`;
      const config = {
        headers: {
          // FIXME: Need to use 〇〇〇
          Authorization: `Bearer ${session?.user.id}`,
        },
      };

      const data = {
        id: id,
        title: title,
        content: content,
      };
      const res = await axios.post(url, data, config);
      if (res.status !== 200) {
        throw new Error("Failed to post item");
      }
      setUsermemo([...usermemo, res.data as Usermemo]);
    } catch (err) {
      console.error(err);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <>
      <FormLabel>Title</FormLabel>
      <Textarea
        whiteSpace="pre-line"
        resize="none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <FormLabel>Content</FormLabel>
      <Textarea
        whiteSpace="pre-line"
        resize="none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      ></Textarea>

      <Button
        isLoading={isLoading}
        loadingText="保存中…"
        colorScheme="green"
        color="white"
        alignSelf="flex-end"
        onClick={postusermemo}
      >
        保存する
      </Button>
    </>
  );
}
