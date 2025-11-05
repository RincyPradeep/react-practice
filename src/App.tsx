import { useState } from 'react'
import './App.css'

// @ts-ignore
import CheckoutStepper from './01_stepper/CheckoutStepper'

import { MultiStepForm } from './02_multi_step_form/MultiStepForm'


function App() {
  return (
    <>
      {/* <CheckoutStepper /> */}
      <MultiStepForm />
        
    </>
  )
}

export default App
