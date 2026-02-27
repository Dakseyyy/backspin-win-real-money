import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const CTASection = () => {
  const [searchParams] = useSearchParams();

  // 1. Capture Click IDs for both platforms
  const snapClickId = searchParams.get("ScCid") || searchParams.get("sc_click_id") || searchParams.get("sccid") || "";
  const tiktokClickId = searchParams.get("ttclid") || "";

  // 2. Determine which platform is driving the traffic (fallback to 'couldnotfindid' if neither)
  const activeClickId = snapClickId || tiktokClickId || "couldnotfindid";

  // 3. Add the active click ID to 'aff_sub' with the offer_id (4016)
  const affiliateLink = `https://gloffers.org/aff_c?offer_id=4016&aff_id=158638`;

  const handleTrackClick = () => {
    // Fire Snapchat Pixel 'View Content' if the Snap pixel is loaded
    if (typeof window !== "undefined" && (window as any).snaptr) {
      (window as any).snaptr('track', 'VIEW_CONTENT', {
        'content_ids': ['4016'],
        'content_type': 'product'
      });
    }

    // Fire TikTok Pixel 'ViewContent' if the TikTok pixel is loaded
    if (typeof window !== "undefined" && (window as any).ttq) {
      (window as any).ttq.track('ViewContent', {
        content_id: '4016',
        content_type: 'product'
      });
    }
  };

  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center transform-gpu"
      >
        <div className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.06] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Ready to play?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Join thousands of players winning real money every day. Download free and start competing.
            </p>
            
            {/* THE MAIN CTA BUTTON */}
            <motion.a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleTrackClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: "transform" }}
              className="inline-flex items-center justify-center rounded-full bg-foreground text-background font-semibold px-10 py-4 text-base transition-all hover:bg-highlight transform-gpu"
            >
              Download Now — It's Free
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;