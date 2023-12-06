import { NextAuthProvider } from "./providers";
import Script from "next/script";
// Styles
import "../styles/css/antd.css";
import "../styles/app.scss";
import { GlobalContextProvider } from "@/context/store";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAh3h-q27PS0_U2_jInAcFhfL7wV890WQc&libraries=places"
          strategy="beforeInteractive"
        ></Script>

        <NextAuthProvider>
          <GlobalContextProvider>
            {children}
          </GlobalContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

export default Layout;
