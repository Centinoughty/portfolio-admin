import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  metadataBase: new URL("https://admin.nadeemsiyam.com"),
  title: "Admin Panel",
  description: "An admin panel for managing my portfolio website",
  icons: {
    icon: "favicon.ico",
  },
  creator: "Nadeem M Siyam",
  authors: [{ name: "Nadeem M Siyam", url: "https://nadeemsiyam.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta>
          <link rel="icon" href="favicon.ico" />
        </meta>
      </Head>
      <body className="antialiased bg-(--accent)">{children}</body>
    </html>
  );
}
