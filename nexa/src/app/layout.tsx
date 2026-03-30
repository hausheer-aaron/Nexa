import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { SupabaseAuthProvider } from "@/components/providers/supabase-auth-provider";
import { AppShell } from "@/components/app/app-shell";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexa",
  description: "Travel journal app for places, trips and route memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${manrope.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SupabaseAuthProvider>
          <AppShell>{children}</AppShell>
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
