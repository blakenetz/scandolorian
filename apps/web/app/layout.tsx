import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import { theme } from "@scandalorian/theme";
import "@scandalorian/theme/styles.css";
import { Header } from "@scandalorian/ui";
import type { Metadata } from "next";
import { Anton } from "next/font/google";
import Nav from "@/components/nav/nav";
import { StoreProvider } from "@/stores/StoreProvider";
import { fetchInitialCache } from "@/stores/fetchInitialCache";
import classes from "@/styles/layout.module.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });

export const metadata: Metadata = {
  title: "The Scandalorian",
  description: "Get the gossip on all your favorite Star Wars characters",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // initial fetch on the server
  const initialData = await fetchInitialCache();

  return (
    <html lang="en" className={anton.variable} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={classes.root}>
        <MantineProvider theme={theme}>
          <StoreProvider initialData={initialData}>
            <Header>
              <Nav />
            </Header>
            <main className={classes.main}>{children}</main>
          </StoreProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
