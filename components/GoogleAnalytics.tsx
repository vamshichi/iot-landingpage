"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      {/* Google Analytics Script */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-V02H06FX47"
        strategy="afterInteractive"
      />

      {/* Google Analytics Config */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag(){
            dataLayer.push(arguments);
          }

          gtag('js', new Date());

          gtag('config', 'G-V02H06FX47');
        `}
      </Script>
    </>
  );
}