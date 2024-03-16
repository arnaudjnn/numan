import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import Header from "./header";

const neuePlak = localFont({
  src: [
    {
      path: "./../components/assets/fonts/NeuePlak/NeuePlak-Thin.ttf",
      weight: "100",
      style: "thin",
    },
    {
      path: "./../components/assets/fonts/NeuePlak/NeuePlak-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "./../components/assets/fonts/NeuePlak/NeuePlak-Regular.ttf",
      weight: "400",
      style: "regular",
    },
    {
      path: "./../components/assets/fonts/NeuePlak/NeuePlak-SemiBold.ttf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./../components/assets/fonts/NeuePlak/NeuePlak-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./../components/assets/fonts/NeuePlak/NeuePlak-ExtraBlack.ttf",
      weight: "900",
      style: "black",
    },
  ],
});

export const metadata: Metadata = {
  title: "Numan | Subscribe",
  description: "Help us personalize your treatment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={neuePlak.className}>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
