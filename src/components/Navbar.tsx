import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar-inner">
        <Link to="/" className="nav-logo">
          Bodhi MindCare
        </Link>
        
        <div className="nav-links">
          <Link to="/about-us">About</Link>
          <Link to="/services">Services</Link>
        </div>
        
        <Link to="/contact-us" className="nav-cta">
          Book a session
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
