import { motion } from 'framer-motion';
import './Stats.css';

const statsData = [
  {
    value: "12+",
    label: "Evidence-based modalities"
  },
  {
    value: "10k+",
    label: "Sessions held"
  },
  {
    value: "4.9/5",
    label: "Average rating"
  }
];

const Stats = () => {
  return (
    <section className="stats-section container">
      <motion.div 
        className="stats-grid"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="stats-intro">
          <h2>Every journey begins with a conversation</h2>
          <p>We provide a safe, judgment-free space to explore your thoughts and feelings. Our evidence-based approach helps you build resilience and find lasting peace.</p>
        </div>
        
        <div className="stats-numbers">
          {statsData.map((stat, index) => (
            <motion.div 
              key={index} 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
