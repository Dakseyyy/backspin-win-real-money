import HeroSection from "@/components/HeroSection";
import USPSection from "@/components/USPSection";
import ReviewsSection from "@/components/ReviewsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <USPSection />
      <ReviewsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
