import "../styles/globals.css";

// import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";

import Layout from "../components/layouts/Layout";

import Head from "next/head";

import store, { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <PersistGate Loading={null} persistor={persistor}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
