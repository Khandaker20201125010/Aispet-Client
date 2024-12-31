import React from "react";
import Banner from "../comonents/Banner/Banner";
import Feature from "../comonents/Feature/Feature";

import Aboutus from "../comonents/Aboutus/Aboutus";
import Services from "./Services";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <Feature></Feature>
      <Aboutus></Aboutus>
      <Services></Services>
    </div>
  );
};

export default Home;
