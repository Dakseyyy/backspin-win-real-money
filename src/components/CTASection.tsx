import { useMemo } from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    snaptr: any;
  }
}

const BASE_AFFILIATE_URL = "https://gloffers.org/aff_c?offer_id=4016&aff_id=158638";

const CTASection = () => {
  // Stable Affiliate Link Generation for Snapchat Only
  const affiliateLink = useMemo(() => {
    if (typeof window === "undefined") return BASE_AFFILIATE_URL;
    
    const urlParams = new URLSearchParams(window.location.search);
    // Snapchat often uses ScCid, but trackers sometimes lowercase it to sccid
    const sccid = urlParams.get("ScCid") || urlParams.get("sccid");

    let newLink = BASE_AFFILIATE_URL;

    if (sccid) {
      // Pass sccid into aff_sub so your postback {aff_sub} maps to sccid on your server
      newLink += `&aff_sub=${sccid}&sub1=${sccid}`;
    }
    
    return newLink;
  }, []);

  const trackSnap = (eventName: string) => {
    console.log(`📡 [Snapchat Tracking] Firing: ${eventName}`);

    if (typeof window !== "undefined" && window.snaptr) {
      let snapEvent = 'PAGE_VIEW';
      if (eventName === 'ViewContent') snapEvent = 'PAGE_VIEW';
      if (eventName === 'SubmitForm') snapEvent = 'VIEW_CONTENT'; 
      if (eventName === 'ClickButton') snapEvent = 'AD_CLICK';
      
      window.snaptr('track', snapEvent);
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    trackSnap("ClickButton");
    
    console.log(`🔗 Redirecting to: ${affiliateLink}`);
    
    // Increased timeout slightly to ensure the Snap pixel fires before navigation
    setTimeout(() => {
      window.location.href = affiliateLink;
    }, 25);
  };

  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
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
            <motion.a
              href={affiliateLink}
              onClick={handleCtaClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-foreground text-background font-semibold px-10 py-4 text-base transition-all hover:bg-highlight"
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