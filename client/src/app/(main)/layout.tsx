
import Navbar from "@/src/components/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cn("font-sans", geist.variable)}>
      <body className="flex">
        <Navbar></Navbar>
        <main className="flex flex-1 items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
