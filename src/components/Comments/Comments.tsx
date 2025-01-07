import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  HStack,
  Divider,
} from "@chakra-ui/react";
import supabase from "@/libs/supabase";

interface Comment {
  id: number;
  content: string;
  created_at: string;
}

interface CommentsProps {
  height?: string;
  width?: string;
  articleId: number; // 記事ごとのID
}

const Comments: React.FC<CommentsProps> = ({ height, width, articleId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("article_id", articleId)
      .order("created_at", { ascending: true });
    if (error) console.error("Error fetching comments:", error);
    else setComments(data || []);
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    const { error } = await supabase
      .from("comments")
      .insert([{ article_id: articleId, content: newComment }]);
    if (error) console.error("Error adding comment:", error);
    setNewComment("");
  };

  useEffect(() => {
    fetchComments();

    // Supabaseリアルタイムリスナー
    const channel = supabase
      .channel(`comments-channel-${articleId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `article_id=eq.${articleId}`,
        },
        (payload) => {
          // 新しいコメントをリアルタイムに反映
          const newComment = payload.new as Comment;
          setComments((prevComments) => [...prevComments, newComment]);
        }
      )
      .subscribe();

    // クリーンアップ関数
    return () => {
      supabase.removeChannel(channel);
    };
  }, [articleId]);

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      width={width}
      height={height}
    >
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        コメント
      </Text>
      <VStack spacing={2} align="stretch" maxH="60%" overflowY="auto">
        {comments.map((comment) => (
          <Box key={comment.id} p={2} bg="gray.100" borderRadius="md">
            <Text fontSize="sm">{comment.content}</Text>
            <Text fontSize="xs" color="gray.500">
              {new Date(comment.created_at).toLocaleString()}
            </Text>
          </Box>
        ))}
      </VStack>
      <HStack height="30%">
        <Input
          placeholder="コメントを入力..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button colorScheme="teal" onClick={addComment}>
          送信
        </Button>
      </HStack>
    </Box>
  );
};

export default Comments;
