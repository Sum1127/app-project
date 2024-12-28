import { Heading, Flex, Box } from "@chakra-ui/react";
import { LoginButton } from "@/components/button/loginbutton";
export default function Home() {
  return (
    <>
      <Flex direction="column" minHeight="100vh">
        <Box
          width="100vw" // 幅を画面の50%
          height="10vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          flex="1"
        >
          <Heading fontSize="4xl">
            サイトを見るにはログインを行ってください。
          </Heading>
        </Box>
        <Box
          width="100vw" // 幅を画面の50%
          height="10vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          flex="1"
        >
          <LoginButton />
        </Box>
      </Flex>
    </>
  );
}
