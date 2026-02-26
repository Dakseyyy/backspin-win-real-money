import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useSearchParams } from "react-router-dom";

// Standard Snap & TikTok Pixel definition
declare global {
  interface Window {
    snaptr: any;
    ttq: any;
  }
}

const HeroSection = () => {
  const [searchParams] = useSearchParams();

  // 1. Capture Click IDs for both platforms
  const snapClickId = searchParams.get("ScCid") || searchParams.get("sc_click_id") || searchParams.get("sccid") || "";
  const tiktokClickId = searchParams.get("ttclid") || "";

  // 2. Determine which platform is driving the traffic (fallback to 'couldnotfindid' if neither)
  const activeClickId = snapClickId || tiktokClickId || "couldnotfindid";

  // 3. Build the link using ONLY aff_sub (Our proven "backpack")
  const affiliateLink = `https://gloffers.org/aff_c?offer_id=4016&aff_id=158638&`;

  // 4. Simple, non-blocking click handler for both platforms
  const handleTrackClick = () => {
    console.log(`📡 [Tracking] Firing events`);
    
    // Fire Snapchat Pixel 'View Content'
    if (typeof window !== "undefined" && window.snaptr) {
      window.snaptr('track', 'VIEW_CONTENT');
    }

    // Fire TikTok Pixel 'ClickButton' (no ViewContent, as requested)
    if (typeof window !== "undefined" && window.ttq) {
      window.ttq.track('ClickButton', {
        content_id: '4016',
        content_type: 'product'
      });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center section-padding overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-foreground/[0.03] blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ willChange: "transform, opacity" }}
        className="relative z-10 text-center max-w-2xl mx-auto transform-gpu"
      >
        {/* Rating badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ willChange: "transform, opacity" }}
          className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8 transform-gpu"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < 4 ? "fill-foreground text-foreground" : i === 4 ? "fill-foreground/60 text-foreground/60" : "text-muted-foreground"}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">4.6 stars · 2K+ reviews</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] mb-6">
          <span className="text-gradient">Backspin</span>
          <br />
          <span className="text-foreground">Games</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          Win real money with skill, not luck. Play against real players. Get paid instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* THE MAIN CTA BUTTON */}
          <motion.a
            href={affiliateLink}            // Standard direct link (No timeout hack)
            onClick={handleTrackClick}      // Fires pixels in the background
            target="_blank"                 // Standard for affiliate links
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ willChange: "transform" }}
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background font-semibold px-8 py-4 text-base transition-all hover:bg-highlight transform-gpu"
          >
            Download Free
          </motion.a>

          <motion.a
            href="#how-it-works"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ willChange: "transform" }}
            className="inline-flex items-center justify-center rounded-full glass-card font-semibold px-8 py-4 text-base text-foreground transition-all hover:bg-foreground/10 transform-gpu"
          >
            Learn More
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ willChange: "opacity" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform-gpu"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2 transform-gpu"
        >
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;