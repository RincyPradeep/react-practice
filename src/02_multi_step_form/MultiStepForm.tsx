import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { StepFormData } from '@/types'
import { UseMultiStepForm } from '@/hooks/use-multi-step-form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import ProgressSteps from '@/components/ProgressSteps'
import { BillingInfoStep, PersonalInfoStep, ProfessionalInfoStep } from '@/components/steps'
import { ChevronLeft, ChevronRight } from 'lucide-react'


export const MultiStepForm = () => {
  //Custom Hook 
  const {
    currentStep, // which step we are on (0,1 or 2)
    formData, // Accumulated data from all steps
    isFirstStep, // Boolean - are we on step 0
    isLastStep, // Boolean - are we on the final step
    isSubmitted, // Boolean - has form been submitted
    steps, // arraynof step metadata ( for progress indicator)

    goToNextStep, // Function to advance
    goToPreviousStep, // Function to go back
    updateFormData, // Function to save step data
    submitForm, // Function for final form submission
    resetForm, // Function to start over
    getCurrentStepSchema // Function returning current zod schema
  } = UseMultiStepForm();

  const {
    register, 
    handleSubmit, 
    formState:{errors}, 
    trigger, 
    setValue, 
    reset
  } = useForm<StepFormData>({
    resolver: zodResolver(getCurrentStepSchema()),
    mode: "onChange",
    defaultValues: formData,
  })

  useEffect (()=>{
    reset(formData)
  },[currentStep, formData, reset])

  const onNext = async(data: StepFormData) =>{
    //Manual validation check

    //Merge current step data with all previous data
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <ProgressSteps currentStep={currentStep} steps={steps} />
        </CardHeader>
        <CardContent className='space-y-6'>
          { currentStep === 0 && <PersonalInfoStep register={register} errors={errors} /> }
          { currentStep === 1 && <ProfessionalInfoStep register={register} errors={errors} setValue={setValue}/> }
          {  currentStep === 2 && <BillingInfoStep register={register} errors={errors} /> }

          <div className='flex justify-between pt-4'>
            <Button 
              type='button' 
              variant={"outline"}
              onClick={goToPreviousStep}
              disabled={isFirstStep}
            >
              <ChevronLeft className='w-4 h-4 mr-1' />
              Previous
            </Button>

            <Button type="button" onClick={handleSubmit(onNext)}>
              {isLastStep? "Submit": "Next"}
              {!isLastStep && <ChevronRight className='w-4 h-4 ml-1' />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
