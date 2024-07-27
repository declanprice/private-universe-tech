import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Private Universe Tech",
  description: "tech test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ChakraProvider>
            <ColorModeScript initialColorMode="light" />
            {children}
          </ChakraProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
