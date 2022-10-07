import "../styles/globals.css";

// import { wrapper, store } from "../redux/store";

import Layout from "../components/layouts/Layout";

import Head from "next/head";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";

import { SessionProvider } from "next-auth/react";
// Notificaation
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
<<<<<<< HEAD
        <link rel="icon" href="images/titleLogo32x32.png" type="image/png" />
        <title>Офис материали - SoftOffice</title>
=======
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      </Head>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </SessionProvider>
      <ToastContainer />
    </>
  );
}

export default MyApp;
