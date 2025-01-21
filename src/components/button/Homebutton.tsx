import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoHome } from "react-icons/io5";

export function GoHomeButton() {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => {
          router.push("/Home");
        }}
        leftIcon={<IoHome />}
        colorScheme="orange"
        color="White"
      >
        ホームに行く
      </Button>
    </>
  );
}
