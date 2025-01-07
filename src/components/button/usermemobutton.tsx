import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function GoUserMemoButton() {
  const router = useRouter();

  return (
    <>
      <Button
        width="20vw"
        onClick={() => {
          router.push("/usermemo");
        }}
        colorScheme="orange"
        color="White"
      >
        メモページに行く
      </Button>
    </>
  );
}
