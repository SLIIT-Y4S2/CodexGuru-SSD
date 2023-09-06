import StyledComponentsRegistry from "@/lib/AntRegistry";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

// context imports
import AuthProvider from "./AuthProvider";
import { LabProvider } from "@/store/LabProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodexGuru",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LabProvider>
            <StyledComponentsRegistry>
              <main>
                <Header />
                <div className="mx-auto max-w-screen-xl px-2 py-2 md:px-8">
                  {children}
                </div>
              </main>
            </StyledComponentsRegistry>
          </LabProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
