import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    text: "I've tried a lot of bingo apps, and this one is by far my favorite. There's more than just bingo, and I love being able to replay matches to see my opponent's strategy, it proves you're playing real people.",
    author: "Verified User",
    stars: 5,
  },
  {
    text: "I've been playing for over three months and it's one of the best out there. The games are fun, the community is great, and there are plenty of chances to win cash.",
    author: "Verified User",
    stars: 5,
  },
  {
    text: "Super easy to start, and the cash outs are real. Way better than normal mobile games.",
    author: "Verified User",
    stars: 5,
  },
];

const ReviewsSection = () => {
  return (
    <section className="section-padding">
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
            Players love it
          </h2>
          <p className="text-muted-foreground text-lg">
            4.6 stars across 2,000+ reviews
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{ willChange: "transform, opacity" }}
              className="glass-card rounded-2xl p-8 flex flex-col transform-gpu"
            >
              <Quote className="w-8 h-8 text-muted-foreground/30 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed flex-1 text-sm">
                "{review.text}"
              </p>
              <p className="mt-6 text-sm font-medium text-muted-foreground">
                — {review.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;