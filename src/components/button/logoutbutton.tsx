import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

import supabase from "@/libs/supabase";

export function LogoutButton() {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={() => {
          supabase.auth.signOut();
          router.push("/");
        }}
        colorScheme="orange"
        color="White"
      >
        ログアウト
      </Button>
    </>
  );
}
