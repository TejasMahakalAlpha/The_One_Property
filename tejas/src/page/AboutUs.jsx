import React from 'react'
import WhoAreWe from '../homescreen/WhoAreWe'
import Mission from '../homescreen/Mission'
import Vision from '../homescreen/Vision'
import CoreValues from '../aboutscreen/CoreValues'
import TrustedBridgeSection from '../aboutscreen/TrustedBridgeSection'
import AboutHeroSection from '../aboutscreen/AboutHeroSection'

function AboutUs() {
  return (
    <div>
      <AboutHeroSection/>
      
      
      <div className="-mt-10 sm:-mt-10">
        <WhoAreWe/>
      </div>

      <div className="-mt-10 sm:-mt-16">
        <Mission/>
      </div>

      <div className="-mt-10 sm:-mt-16">
        <Vision/>
      </div>

      <div className="-mt-16 sm:-mt-6">
        <CoreValues/>
      </div>

      <div className="-mt-10 sm:-mt-16">
        <TrustedBridgeSection/>
      </div>
    </div>
  )
}

export default AboutUs