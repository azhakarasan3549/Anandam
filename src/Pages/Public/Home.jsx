import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import Howitswork from "../../Components/Howitswork.jsx";
import { useContext } from "react";
import { UserProfiles} from "../../Context/UserContext.jsx"
import Carousel from "../../Components/Carousel.jsx";
import bg from "../../Asserts/background.svg";

const Home = () => {
  const { profiles, loading } = useContext(UserProfiles); 
  
  return (
    < >
     <div
  className="bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${bg})` }}
>
      <Navbar />
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Life Partner
          </h1>
          <p className="text-gray-400 mb-6">
            Trusted matrimonial service with verified profiles.
          </p>
        </div>
      </section>
      </div>

      <Howitswork />
      <Carousel/>
      <Footer />
    </>
  );
};

export default Home;
