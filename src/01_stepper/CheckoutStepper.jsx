import React, {useEffect, useRef, useState} from 'react'
import './style.css'

const CheckoutStepper = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight:0
  })
  const stepRef = useRef([])

  const CHECKOUT_STEPS =[
    {
      name: "Customer Info",
      description: "Provide your contact details"
    },
    {
      name: "Shipping Info",
      description: "Enter your shipping address"
    },
    {
      name: "Payment",
      description: "Complete payment for your order"
    },
    {
      name: "Delivered",
      description: "Your order has been delivered"
    },
  ]

  useEffect(()=>{
    //dynamic width of progressbar
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth/2,
      marginRight: stepRef.current[CHECKOUT_STEPS.length-1].offsetWidth/2
    })
  },[stepRef, CHECKOUT_STEPS.length ])

  const handleNext = ()=>{
    setCurrentStep(prev=>{
      if(prev===CHECKOUT_STEPS.length){
        setIsComplete(true)
        return prev;
      }else{
        return prev+1
      }
      })
  }

  const calculateProgressbarWidth = ()=>{
    return ((currentStep-1)/(CHECKOUT_STEPS.length-1))*100
  }

  return (
    <>
      <h2>Checkout</h2>
      <div className='stepper'>
        {
          CHECKOUT_STEPS?.map((step,index)=>{
            return(
              <div 
                key={step.name}
                ref={(el)=>(stepRef.current[index]=el)}
                className={`step ${currentStep===index+1?'active': ''} ${currentStep > index+1 || isComplete ? 'complete': ''}`}>
                <div className='step-number'>{currentStep > index+1 || isComplete ? <span>&#10003;</span> : index+1}</div>
                <div class-name="step-name">{step.name}</div>
              </div>
            )
          })
        }

        <div 
          className='progress-bar' 
          style={{width:`calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight
          }}

        >
          <div className='progress' style={{width:`${calculateProgressbarWidth()}%`}}></div>
        </div>
      </div>


      {!isComplete &&
        <button className='btn' onClick={handleNext}>
          {currentStep===CHECKOUT_STEPS.length? "Finish": "Next"}
        </button>
      }

      <div className='description'>{CHECKOUT_STEPS[currentStep-1].description}</div>
    </>
  )
}

export default CheckoutStepper