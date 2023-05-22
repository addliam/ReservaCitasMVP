import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { roboto } from "../utils/fonts/roboto";
import { store } from "@/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

// console.log("NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID");
// console.log(process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID);
export default function App({ Component, pageProps }: AppProps) {
  return (
    // TODO: remover max-w y desarrollar UI para tabletas y PCs
    <main
      className={`${roboto.className} sm:max-w-[460px] sm:min-h-screen sm:mx-auto sm:border-x-2 sm:outline sm:outline-[#f8f8f8] overflow-y-auto `}
    >
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || ""}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </GoogleOAuthProvider>
    </main>
  );
}
