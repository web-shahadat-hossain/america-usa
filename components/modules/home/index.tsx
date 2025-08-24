import BlogsSection from "./BlogsSection";
import FaqSection from "./FAQSection";
import HeroSection from "./HeroSection";
import SendAGift from "./SendAGift";
import ShipItYourWay from "./ShipItYourWay";
import Testimonials from "./Testimonials";
import WorksSection from "./WorksSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ShipItYourWay />
      <SendAGift />
      <WorksSection />
      <BlogsSection />
      <Testimonials />
      <FaqSection />
    </div>
  );
};

export default Home;
