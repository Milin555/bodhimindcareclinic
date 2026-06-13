import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Therapists.css';

const therapists = [
  {
    name: "Dr. Harvee Shah",
    title: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Dr. Harvee Shah",
    title: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1594824432463-2384a5a54db5?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Dr. Harvee Shah",
    title: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Dr. Harvee Shah",
    title: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=800&auto=format&fit=crop"
  }
];

const Therapists = () => {
  return (
    <section className="therapists-section container">
      <div className="therapists-header">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Meet our therapists
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Our team is composed of licensed therapists, each bringing a unique set of skills and a shared commitment to compassionate care. We are here to guide you through your mental health journey.
        </motion.p>
      </div>

      <div className="therapists-grid">
        {therapists.map((therapist, index) => (
          <motion.div 
            key={index}
            className="therapist-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className="therapist-image">
              <img src={therapist.image} alt={therapist.name} />
              <Link to="/contact-us" className="book-pill">
                Book session
              </Link>
            </div>
            <div className="therapist-info">
              <h3>{therapist.name}</h3>
              <p>{therapist.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="therapists-footer">
        <Link to="/about-us" className="btn-primary">
          Meet the whole team <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }}/>
        </Link>
      </div>
    </section>
  );
};

export default Therapists;
