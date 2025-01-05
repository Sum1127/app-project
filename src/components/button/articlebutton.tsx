import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function GoArticleButton() {
  const router = useRouter();

  return (
    <>
      <Button
        width="20vw"
        onClick={() => {
          router.push("/articles");
        }}
        colorScheme="orange"
        color="White"
      >
        記事を見に行く
      </Button>
    </>
  );
}
