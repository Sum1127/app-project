import { Button, HStack } from "@chakra-ui/react";
import supabase from "@/libs/supabase";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaDiscord } from "react-icons/fa";

export function LoginButton() {
  async function getgithub() {
    try {
      const {} = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function getdiscord() {
    try {
      const {} = await supabase.auth.signInWithOAuth({
        provider: "discord",
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function getGoogle() {
    try {
      const {} = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <HStack spacing={4}>
        <Button onClick={getgithub} width="30%">
          <FaGithub />
        </Button>
        <Button onClick={getdiscord} width="30%">
          <FaDiscord />
        </Button>
        <Button onClick={getGoogle} width="30%">
          <FcGoogle />
        </Button>
      </HStack>
    </>
  );
}
