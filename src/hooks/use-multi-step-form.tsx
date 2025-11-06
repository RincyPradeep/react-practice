import { billingInfoSchema, personalInfoSchema, professionalInfoSchema, Step, StepFormData } from "@/types"
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
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<Partial<StepFormData>>({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === steps.length - 1

    //Returns the schema for current step
    const getCurrentStepSchema = () => stepSchemas[currentStep]
}