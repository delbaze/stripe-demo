import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Layout from "@/components/layout-elements/Layout";
import DemoContextProvider from "@/contexts/DemoContext";
import dynamic, { noSSR } from "next/dynamic";

function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "http://localhost:4005",
    cache: new InMemoryCache(),
    credentials: "include",
  });

  return (
    <DemoContextProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </DemoContextProvider>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
