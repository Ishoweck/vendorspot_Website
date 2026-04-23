import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JourneySection from "@/components/JourneySection";
import SafeBuyingSection from "@/components/SafeBuyingSection";
import TopSellers from "@/components/TopSellers";
import Testimonials from "@/components/Testimonials";
import StoriesOnSpot from "@/components/StoriesOnSpot";
import FAQ from "@/components/FAQ";
import RefundBanner from "@/components/RefundBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <JourneySection />
        <SafeBuyingSection />
        <TopSellers />
        <Testimonials />
        <StoriesOnSpot />
        <FAQ />
        <RefundBanner />
      </main>
      <Footer />
    </>
  );
}
