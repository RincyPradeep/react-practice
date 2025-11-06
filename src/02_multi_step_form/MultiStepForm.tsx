import { Button } from '@/components/ui/button'
import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { StepFormData } from '@/types'


export const MultiStepForm = () => {
  //Custom Hook 
  const {
    register, 
    handleSubmit, 
    formState:{errors}, 
    trigger, 
    setValue, 
    reset
  } = useForm<StepFormData>({
    // resolver: zodResolver(getCurrentStepSchema())
  })

  return (
    <div>
        <Button variant={"outline"}>Next</Button>
    </div>
  )
}
