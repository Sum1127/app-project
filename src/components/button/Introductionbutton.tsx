import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function GoIntroduction() {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => {
          router.push("/introduction");
        }}
        colorScheme="orange"
        color="White"
      >
        このサイトについて
      </Button>
    </>
  );
}
