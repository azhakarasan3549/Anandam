import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import Howitswork from "../../Components/Howitswork.jsx";
import { useContext } from "react";
import { UserProfiles} from "../../Context/UserContext.jsx"
import Carousel from "../../Components/Carousel.jsx";


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
    style={{ backgroundImage: "url('/design.svg')" }}
  ></div>

  {/* ✅ Content */}
  <div className="relative z-10">
    <Navbar />

    <section className="min-h-[50vh] flex items-center">
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
</div>

      <Howitswork />
      <Carousel/>
      <Footer />
    </>
  );
};

export default Home;
