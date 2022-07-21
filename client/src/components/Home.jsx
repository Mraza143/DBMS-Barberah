import React from 'react';
// import Services from './Services';
// import Welcome from './Welcome';
// import SpecialButton from './SpecialButton';
// import Salons from './Salons';
import Welcome from "./Welcome"
import Services from "./Services"


function Home() {
  return (
    <>
    <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Welcome />
    </div>
    <Services />

    {/* <Salons
    total={4}
    /> */}


    {/* <SpecialButton/> */}

  </div>
    </>
  );
}

export default Home;