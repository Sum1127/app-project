import { Button, FormLabel, Input } from "@chakra-ui/react";
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

  async function PostUsermemo() {
    try {
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
    }
  }

  return (
    <>
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

      <Button onClick={PostUsermemo}>Save</Button>
    </>
  );
}
