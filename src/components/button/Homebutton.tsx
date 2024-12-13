import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function GoHomeButton() {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => {
          router.push("/Home");
        }}
      >
        サイトに行く
      </Button>
    </>
  );
}
