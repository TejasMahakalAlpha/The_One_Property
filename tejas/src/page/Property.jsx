import React from 'react'
import { PropertiesPage } from '../PropertiesPagescreen/PropertiesPage';
import HeroPropertiesPage from '../PropertiesPagescreen/HeroPropertiesPage';
// import EmiCalculator from '../PropertiesPagescreen/EmiCalculator';

function Property() {
  return (
    <div>
        <HeroPropertiesPage/>
      <PropertiesPage/>
    {/* <EmiCalculator/> */}
    </div>
  )
}

export default Property