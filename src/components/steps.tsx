import React, {useState} from 'react'
import { CardTitle } from './ui/card'
import FormField from './form-field'
import { StepFormData } from '@/types';
import {useForm} from 'react-hook-form'
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"


interface StepProps {
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Record<string, {message?: string}>;
  setValue?: ReturnType<typeof useForm<StepFormData>>["setValue"];
}


const PersonalInfoStep = ({register, errors}:StepProps) => {
  return (
    <div className='space-y-4'>
      <CardTitle className='text-xl'>Personal Information</CardTitle> 
      <div className='grid grid-cols-2 gap-4'>
        <FormField 
          id= "firstName"
          label= "First Name"
          register={register}
          errors= {errors}
        />
        <FormField 
          id= "lastName"
          label= "Last Name"
          register={register}
          errors= {errors}
        />
      </div>
      <FormField 
          id= "email"
          label= "Email Address"
          register={register}
          errors= {errors}
          type="email"
        />
        <FormField 
          id= "phoneNumber"
          label= "Phone Number"
          register={register}
          errors= {errors}
          type= "tel"
        />
    </div>
  )
}


const ProfessionalInfoStep = ({register, errors, setValue }:StepProps) => {
  const [experience, setExperience] = useState("")
  return (
    <div className='space-y-4'>
      <CardTitle className='text-xl'>Professional Information</CardTitle> 
      
      <FormField 
          id= "company"
          label= "Company"
          register={register}
          errors= {errors}
        />
        <FormField 
          id= "position"
          label= "Position"
          register={register}
          errors= {errors}
        />
        <div className='space-y-2'>
          <Label htmlFor="experience">Years of Experience</Label>
          <Select onValueChange={(value)=>{
            setValue?.(
              "experience", 
              value as Extract<
              StepFormData,
              {experience:string}
              >["experience"],
              {shouldValidate:true} // Trigger validation immediately
            )
            setExperience(value)
            }}
              value={experience}
            >
            <SelectTrigger>
              <SelectValue placeholder="Select Experience" />{" "}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2 Years</SelectItem>
              <SelectItem value="3-5">3-5 Years</SelectItem>
              <SelectItem value="6-10">6-10 Years</SelectItem>
              <SelectItem value="10+">10+ Years</SelectItem>
            </SelectContent>
          </Select>
          {
            errors.experience &&
            <p className='text-sm text-destructive'>{errors.experience.message}</p>
          }
        </div>
    </div>
  )
}


const BillingInfoStep = ({register, errors}:StepProps) => {
  return (
    <div>BillingInfoStep</div>
  )
}

export {PersonalInfoStep, ProfessionalInfoStep, BillingInfoStep}