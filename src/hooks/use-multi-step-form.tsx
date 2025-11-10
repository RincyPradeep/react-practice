import { billingInfoSchema, personalInfoSchema, professionalInfoSchema, Step, StepFormData } from "@/types"
import { log } from "console"
import { Briefcase, CreditCard, User } from "lucide-react"
import { useState } from "react"

const stepSchemas = [
    personalInfoSchema,
    professionalInfoSchema,
    billingInfoSchema
]

export const steps:Step[] = [
    {
        id: "personal",
        name: "Personal Info",
        icon: User
    },
    {
        id: "professional",
        name: "Professinal Info",
        icon: Briefcase
    },
    {
        id: "billing",
        name: "Billing Info",
        icon: CreditCard
    },
]
export function UseMultiStepForm(){
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<Partial<StepFormData>>({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === steps.length - 1

    //Returns the schema for current step
    const getCurrentStepSchema = () => stepSchemas[currentStep]

    //Go to next step
    const goToNextStep = () =>{
        if(!isLastStep){
            setCurrentStep(prev=> prev + 1)
        }
    }

    //Go to previous step
    const goToPreviousStep = () =>{
        if(!isFirstStep){
            setCurrentStep(prev=> prev - 1)
        }
    }

    //Merge and update form data
    const updateFormData = (newData:Partial<StepFormData>)=>{
        setFormData(prev=> ({...prev , ...newData}))
    }

    //Handle final form submission
    const submitForm = (data:StepFormData) =>{
        console.log("Final data:",data);
        setIsSubmitted(true)
    }

    //Reset the form entirely
    const resetForm = () =>{
        setFormData({})
        setCurrentStep(0)
        setIsSubmitted(false)
    }

    return{
        currentStep,
        formData,
        isFirstStep,
        isLastStep,
        isSubmitted,
        steps,

        goToNextStep,
        goToPreviousStep,
        updateFormData,
        submitForm,
        resetForm,
        getCurrentStepSchema
    }
}