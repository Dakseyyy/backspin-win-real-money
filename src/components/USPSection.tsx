import { motion } from "framer-motion";
import { Zap, Shield, Users, DollarSign } from "lucide-react";

const usps = [
  {
    icon: DollarSign,
    title: "Win Real Money",
    description: "Instant payouts, zero waiting. Your winnings hit your account the moment you earn them.",
  },
  {
    icon: Shield,
    title: "100% Skill Based",
    description: "No luck, no gambling. You win because you're better. Pure skill, pure competition.",
  },
  {
    icon: Users,
    title: "Real Players",
    description: "Every match is against a real person. Fair, skill-based matchmaking keeps it competitive.",
  },
  {
    icon: Zap,
    title: "Fast Payouts",
    description: "No delays. Request your cash and get it. It's that simple.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 } as const,
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const USPSection = () => {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ willChange: "transform, opacity" }}
          className="text-center mb-16 transform-gpu"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Why players choose us
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Built for competitive players who want a fair shot at winning.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
        >
          {usps.map((usp) => (
            <motion.div
              key={usp.title}
              variants={item}
              style={{ willChange: "transform, opacity" }}
              className="glass-card rounded-2xl p-8 group hover:bg-foreground/[0.08] transition-colors duration-300 transform-gpu"
            >
              <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mb-5 group-hover:bg-foreground/15 transition-colors">
                <usp.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{usp.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{usp.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default USPSection;