import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Therapists from '../components/Therapists';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Stats />
      <Services />
      <Therapists />
      <Testimonials />
    </div>
  );
};

export default Home;
