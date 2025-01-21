import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { SessionProvider } from "@/providers/SessionProvider";
import { SiteHeader } from "@/components/Header/SiteHeader";
import { SiteFooter } from "@/components/Footer/SiteFooter";

export default function App({ Component, pageProps, router }: AppProps) {
  const noHeadernoFooter = ["/"];
  const showHeaderFooter = !noHeadernoFooter.includes(router.pathname);

  return (
    <RecoilRoot>
      <SessionProvider>
        <ChakraProvider>
          <SiteHeader showHeaderFooter={showHeaderFooter} />
          <Component {...pageProps} />
          <SiteFooter showHeaderFooter={showHeaderFooter} />
        </ChakraProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}
