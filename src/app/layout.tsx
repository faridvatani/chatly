import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/header/header";
import Providers from "@/components/providers/Providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Chatly",
  description: "Chat with any PDF using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en" suppressHydrationWarning>
          <body
            className="font-sans antialiased w-screen min-h-screen flex justify-center items-center bg-gradient-to-tr from-gray-900 via-purple-900 to-violet-600"
            suppressHydrationWarning
          >
            <Header />
            {children}
            <Toaster />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
