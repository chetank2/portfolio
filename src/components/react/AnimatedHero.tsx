import { motion } from "framer-motion";
import { fadeUp, fadeIn } from "../../lib/animations";

interface Props {
  tagline: string;
  subtitle: string;
  bio: string;
}

const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export default function AnimatedHero({ tagline, subtitle, bio }: Props) {
  const words = tagline.split(" ");

  return (
    <div>
      <motion.h1
        variants={wordContainer}
        initial="hidden"
        animate="visible"
        className="font-serif text-5xl md:text-7xl leading-tight gradient-text"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={fadeUp}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: words.length * 0.08 + 0.2 }}
        className="mt-6 text-lg md:text-xl text-text-secondary"
      >
        {subtitle}
      </motion.p>

      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: words.length * 0.08 + 0.4 }}
        className="mt-4 text-text-secondary max-w-xl"
      >
        {bio}
      </motion.p>
    </div>
  );
}
