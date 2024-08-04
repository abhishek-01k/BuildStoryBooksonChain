import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ThirdwebProvider } from "thirdweb/react";

export const metadata: Metadata = {
  title: "BuildStoryBookswithAIAgent",
  description: "Mint them OnChain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ThirdwebProvider>
        <Header />
        {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
