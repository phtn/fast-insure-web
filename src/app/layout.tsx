import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCProvider } from "@/trpc/provider";
import { Toaster } from "sonner";
import { Navbar } from "./_navbar";
import { AuthProvider } from "./context";
import { Footer } from "./footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Fast Insure",
  description: "Fastest Growing Insurance Provider",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <AuthProvider>
          <TRPCProvider cookies={cookies().toString()}>
            <Navbar />
            <div className={`overflow-y-scroll`}>
              {children}
              <Footer />
            </div>
          </TRPCProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
