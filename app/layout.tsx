import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'


const myFont = localFont({
  src: '../public/fonts/AppleSDGothicNeoEB.ttf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Art history",
  description: "유럽 미술사 한눈에 보기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={myFont.className}>
      <body >{children}
      <div id="global-modal"></div>
      </body>
    </html>
  );
}
