import "@/styles/globals.css";

import { GeistMono } from "geist/font/mono";
import { Inter, Anek_Tamil } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCProvider } from "@/trpc/provider";
import { Toaster } from "sonner";
import { AuthProvider } from "./(context)/context";
import type { Metadata, Viewport } from "next";
import { TooltipProvider } from "./(ui)/tooltip";
import Navbar from "./(components)/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const k2d = Anek_Tamil({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-k2d",
});

const APP_NAME = "Fast Insure";
const APP_DEFAULT_TITLE = "Lead The Future";
const APP_TITLE_TEMPLATE = "%s - Lead the Future";
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
    startupImage: "/icons/fast_easy_512.png",
  },
  formatDetection: {
    telephone: false,
  },
  icons: [
    {
      rel: "icon",
      url: "/icons/fast_easy_16.png",
      type: "image/png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      url: "/icons/fast_easy_32.png",
      type: "image/png",
      sizes: "32x32",
    },
    {
      rel: "apple-icon",
      url: "/icons/fast_easy_180.png",
      type: "image/png",
      sizes: "180x180",
    },
    {
      rel: "apple-touch-icon",
      url: "/icons/fast_easy_180.png",
      type: "image/png",
      sizes: "180x180",
    },
  ],
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
      <body
        className={`font-sans ${inter.variable} ${k2d.variable} ${GeistMono.variable}`}
      >
        <TooltipProvider delayDuration={100}>
          <AuthProvider>
            <TRPCProvider cookies={cookies().toString()}>
              <Navbar />
              <div className={``}>{children}</div>
            </TRPCProvider>
          </AuthProvider>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
