import Navbar from "@/src/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
    </>
  );
}