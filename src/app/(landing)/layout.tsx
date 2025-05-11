import Footer from "@/components/landing-page/footer";
import Navbar from "@/components/landing-page/navbar";

function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default LandingLayout;
