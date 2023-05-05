import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { roboto } from "../utils/fonts/roboto";
import { store } from "@/store";
import { Provider } from "react-redux";

// console.log("NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID");
// console.log(process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
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
