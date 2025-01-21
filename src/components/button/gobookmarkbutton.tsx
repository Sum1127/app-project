import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaRegStar } from "react-icons/fa";

export function GoBookMarkButton() {
  const router = useRouter();

  return (
    <>
      <Button
        width="20vw"
        onClick={() => {
          router.push("/bookmark");
        }}
        leftIcon={<FaRegStar />}
        alignSelf="flex"
        colorScheme="blue"
        color="White"
      >
        お気に入り記事を見に行く
      </Button>
    </>
  );
}
