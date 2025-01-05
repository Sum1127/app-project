import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function GoCreateArticleButton() {
  const router = useRouter();

  return (
    <>
      <Button
        width="20vw"
        onClick={() => {
          router.push("/createarticle");
        }}
        colorScheme="orange"
        color="White"
      >
        記事を作る
      </Button>
    </>
  );
}
