import { motion } from "framer-motion";
import { fadeIn } from "../../lib/animations";

interface Props {
  tagline: string;
  subtitle: string;
  bio: string;
}

const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
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
        className="type-hero-title text-text-primary"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariant}
            className="inline-block mr-[0.28em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: words.length * 0.05 + 0.16 }}
        className="type-hero-body mt-6 sm:mt-8 text-text-secondary max-w-2xl 2xl:max-w-3xl"
      >
        {subtitle}
      </motion.p>

      {bio && (
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: words.length * 0.05 + 0.32 }}
          className="type-body-sm mt-3 sm:mt-4 text-text-tertiary max-w-xl 2xl:max-w-2xl"
        >
          {bio}
        </motion.p>
      )}
    </div>
  );
}
