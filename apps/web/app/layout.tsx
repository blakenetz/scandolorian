import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { Header } from "@scandalorian/ui";
import { theme } from "@scandalorian/theme";
import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "@mantine/core/styles.css";
import "@scandalorian/theme/styles.css";
import Nav from "./components/Nav/Nav";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });

export const metadata: Metadata = {
  title: "The Scandalorian",
  description: "Get the gossip on all your favorite Star Wars characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={anton.variable} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <MantineProvider theme={theme}>
          <Header>
            <Nav />
          </Header>
          <main>{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}
