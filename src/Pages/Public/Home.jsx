import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import Howitswork from "../../Components/Howitswork.jsx";
import { useContext } from "react";
import { UserProfiles} from "../../Context/UserContext.jsx"
import Carousel from "../../Components/Carousel.jsx";
import Cast from "../../Components/Cast.jsx";
import { HeroSection } from "./HeroSection.jsx";


const Home = () => {
  const { profiles, loading } = useContext(UserProfiles); 
  
  return (
    < >
   <div
  className="relative bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/background.svg')" }}
>
  {/* ✅ Overlay */}
  <div
    className="absolute   bg-no-repeat bg-[length:1500px] inset-0 bg-center opacity-5"
    style={{ backgroundImage: "url('/design2.svg')" }}
  ></div>

  {/* ✅ Content */}
  <div className="relative z-10">
    <Navbar />
    <HeroSection/>

  </div>
</div>
      <Cast/>
      <Howitswork />
      <Carousel/>
      <Footer />
    </>
  );
};

export default Home;
