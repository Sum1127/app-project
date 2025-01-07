import { Center, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { HelloUserMessage } from "@/components/Message/HelloUserMessage";

export default function Home() {
  return (
    <>
      <Head>
        <title>健康まとめサイト</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh">
        <VStack>
          <HelloUserMessage />
        </VStack>
      </Center>
    </>
  );
}
