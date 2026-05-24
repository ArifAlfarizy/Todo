import "./globals.css";
import Navbar from "../components/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "../contexts/AuthContext";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cn("font-sans", geist.variable)}>
      <body className="flex">
        <AuthProvider>
        <main className="flex flex-1 items-center justify-center">
          {children}
        </main>
        </AuthProvider>
      </body>
    </html>
  );
}
