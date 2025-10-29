import React from "react";
import Mission from "../homescreen/Mission";
import Vision from "../homescreen/Vision";
import Highlight from "../homescreen/Highlight";
import Bank from "../homescreen/Bank";
import Description from "../homescreen/Description";
import WhoAreWe from "../homescreen/WhoAreWe";
import HeroSection from "../homescreen/HeroSection";

function Home() {
  return (
    <section 
      className="bg-white flex flex-col gap-8 md:gap-12"
    >
      <HeroSection />
      <Description />
      <Highlight />
      <Bank />
      <WhoAreWe />

      {/* --- Mission aur Vision ko ek naye DIV mein group kiya --- */}
      {/* Ismein gap bahut kam rakha hai, taaki woh ek section lage. */}
      <div className="flex flex-col gap-0 md:gap-0">
          <Mission />
          <Vision />
      </div>
    </section>
  );
}

export default Home;