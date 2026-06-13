import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Bodhi MindCare</h3>
            <p>A sanctuary for the mind, body, and spirit. Evidence-based therapy and wellness services in Vadodara, Gujarat 390007 — and virtually, wherever you are.</p>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-column">
              <h4>Pages</h4>
              <Link to="/">Home</Link>
              <Link to="/about-us">About us</Link>
              <Link to="/services">Services</Link>
              <Link to="/contact-us">Contact us</Link>
            </div>
            
            <div className="footer-column">
              <h4>Contact</h4>
              <Link to="/contact-us">Book a Session</Link>
              <a href="tel:07990469284">079904 69284</a>
              <p>108, Meraki Latitude, Old Padra Rd, Vadodara</p>
            </div>
            
            <div className="footer-column">
              <h4>Social Media</h4>
              <a href="#instagram">Instagram</a>
              <a href="#facebook">Facebook</a>
              <a href="#linkedin">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-legal">
            <p>© {new Date().getFullYear()} Bodhi MindCare Clinic Wellness LLC</p>
            <div className="legal-links">
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Terms of Service</Link>
            </div>
          </div>
          
          <div className="footer-big-text">
            <span>B</span>
            <span>O</span>
            <span>D</span>
            <span>H</span>
            <span>I</span>
            <span> </span>
            <span>M</span>
            <span>I</span>
            <span>N</span>
            <span>D</span>
            <span>C</span>
            <span>A</span>
            <span>R</span>
            <span>E</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
