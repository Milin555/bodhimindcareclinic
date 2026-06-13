import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    quote: "Brilliant Doctor and Soothing space...",
    author: "(Google Review)",
    rating: 5
  },
  {
    quote: "Good explanation.. good experience",
    author: "(Google Review)",
    rating: 5
  },
  {
    quote: "Dr. Harvee is one of the friendliest human being i've ever encountered.",
    author: "(Google Review)",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <motion.div 
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Client stories</h2>
          <p>Read what our clients have to say about their experience with Bodhi MindCare Clinic.</p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" stroke="none" />
                ))}
              </div>
              <blockquote>"{testimonial.quote}"</blockquote>
              <div className="author">
                <p>{testimonial.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
