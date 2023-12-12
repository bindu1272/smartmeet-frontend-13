"use client";
import Script from "next/script";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          <Script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAh3h-q27PS0_U2_jInAcFhfL7wV890WQc&libraries=places"
            strategy="beforeInteractive"
          ></Script>
          {children}
      </body>
    </html>
  );
}

export default Layout;
