import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  {
    title: "Individual Therapy",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    link: "/services/individual-therapy"
  },
  {
    title: "Couples Therapy",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
    link: "/services/couples-therapy"
  },
  {
    title: "Anxiety & Trauma",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop",
    link: "/services/anxiety-trauma"
  },
  {
    title: "EMDR Therapy",
    image: "https://images.unsplash.com/photo-1528716321680-815a8cdb8c10?q=80&w=800&auto=format&fit=crop",
    link: "/services/emdr"
  }
];

const Services = () => {
  return (
    <section className="services-section container">
      <motion.div 
        className="services-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Our Services</h2>
        <Link to="/services" className="view-all-link">
          View all services <ArrowRight size={16} />
        </Link>
      </motion.div>

      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            className="service-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <Link to={service.link}>
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <div className="service-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
