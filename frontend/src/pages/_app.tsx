import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
console.log("NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID");
console.log(process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || ""}
    >
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
