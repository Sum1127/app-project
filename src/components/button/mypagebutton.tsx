import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function GoMypageButton() {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => {
          router.push("/mypage");
        }}
        colorScheme="orange"
        color="White"
      >
        マイページ
      </Button>
    </>
  );
}
