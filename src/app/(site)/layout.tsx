import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Everything but /talk, which runs full-screen without the site chrome.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
