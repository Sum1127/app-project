import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { SessionProvider } from "@/providers/SessionProvider";
import { SiteHeader } from "@/components/Header/SiteHeader";
import { SiteFooter } from "@/components/Footer/SiteFooter";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider>
        <ChakraProvider>
          <SiteHeader />
          <Component {...pageProps} />;
          <SiteFooter />
        </ChakraProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}
