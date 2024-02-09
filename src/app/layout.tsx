import "@/styles/globals.css";

import { GeistMono } from "geist/font/mono";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCProvider } from "@/trpc/provider";
import { Toaster } from "sonner";
import { Navbar } from "./_navbar";
import { AuthProvider } from "./context";
import { Footer } from "./footer";
import { Metadata, Viewport } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const APP_NAME = "Fast Insure";
const APP_DEFAULT_TITLE = "Fast Insure";
const APP_TITLE_TEMPLATE = "%s - Fast Insure";
const APP_DESCRIPTION = "Fastest Growing Fintech in the Philippines";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/app.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: "/icons/icon_metal_512.jpeg",
  },
  formatDetection: {
    telephone: false,
  },
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${GeistMono.variable}`}>
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
