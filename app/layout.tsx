import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Provider from "./Provider";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config/walletConfig";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Provider initialState={initialState}>
          <>
            <Header />
            {children}
          </>
        </Provider>
      </body>
    </html>
  );
}
