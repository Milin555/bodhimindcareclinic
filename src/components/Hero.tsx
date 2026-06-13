import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  // Staggered word animation
  const headingWords = "Therapy & Anxiety Treatment That Works".split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  } as const;

  return (
    <section className="hero-section">
      {/* Background Image */}
      <div className="hero-bg">
        <img 
          src="https://framerusercontent.com/images/2zSBYRPVYM7MXJV8p1FsGGmcE.jpg?width=2500&height=2074" 
          alt="Woman in nature" 
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content container">
        <motion.div 
          className="hero-label-pill"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Sparkles size={16} />
          <span>Licensed Trauma & Anxiety Therapists</span>
        </motion.div>

        <motion.h1 
          className="hero-heading"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {headingWords.map((word, index) => (
            <motion.span
              variants={child}
              style={{ display: "inline-block", marginRight: "0.25em" }}
              key={index}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          className="hero-subtext"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Work with licensed therapists specializing in anxiety, PTSD, and trauma using EMDR, CBT, and 12+ evidence-based modalities. In-person and virtual sessions — same-week appointments available.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
