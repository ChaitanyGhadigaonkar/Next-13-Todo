import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Toast from "@/components/Toast";
import AuthProvider from "./context/AuthProvider";
import DarkContextProvider from "./context/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "Next 13 Todo App with Next Auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DarkContextProvider>
        <html lang="en">
          <body
            className={`${inter.className} container mx-auto min-h-screen dark:bg-[#040D12] dark:text-white`}
          >
            <Toast />
            <Header />
            {children}
          </body>
        </html>
      </DarkContextProvider>
    </AuthProvider>
  );
}
