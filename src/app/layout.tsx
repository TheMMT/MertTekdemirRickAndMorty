import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { ReactQueryProvider } from '@/lib/providers/react-query-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty Explorer",
  description: "Explore the characters of Rick and Morty universe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <ReactQueryProvider>
              <div className="relative min-h-screen">
                <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] z-0" />
                <div className="relative z-10">
                  <Navbar />
                  <main>{children}</main>
                  <footer className="py-6 text-center text-sm text-muted-foreground bg-black/70">
                    <p>{new Date().getFullYear()} Rick and Morty Explorer</p>
                  </footer>
                </div>
              </div>
            </ReactQueryProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
