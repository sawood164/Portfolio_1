import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Portfolio",
  description: "Your portfolio description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
