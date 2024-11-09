import { Helmet } from "react-helmet";
import HomeOffers from "./Shared/HomeOffers";
import Popular from "../../components/PopularCategory/Popular";
import BenifetService from "../../components/PopularCategory/BenifetService/BenifetService";
import HomeSliderComponent from "../../components/HomeSliderComponent/SliderComponent";


import Slider from './Shared/Slider';



import LaptopProduct from "./LaptopProduct";
import MousBanner from "../../components/MousBanner/MousBanner";

const Home = () => {
  return (
    <div className="bg-[#F6F6F6]">
      <Helmet>
        <title>Home | Electro Mart</title>
      </Helmet>
      <div >
        <Slider/>
      </div>
      <BenifetService />
      <Popular />
      <HomeOffers />

      {/* <FilterProduct /> */}
      <HomeSliderComponent />
      <LaptopProduct/>
      <MousBanner/>

    </div>
  );
};
export default Home;