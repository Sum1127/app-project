import { Heading } from "@chakra-ui/react";
import { LoginButton } from "@/components/button/loginbutton";
export default function Home() {
  return (
    <>
      <Heading fontSize="4xl">
        サイトを見るにはログインを行ってください。
      </Heading>
      <LoginButton />
    </>
  );
}
