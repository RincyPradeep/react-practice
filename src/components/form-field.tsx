import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'

import { AllFormFields, StepFormData } from '@/types';
import {useForm} from 'react-hook-form'


const FormField = ({
    register,
    label,
    id,
    type="text",
    maxLength,
    errors
}:{
    register: ReturnType<typeof useForm<StepFormData>>["register"];
    label: string;
    id: keyof AllFormFields;
    type: string;
    maxLength?: number;
    errors: Record<string, {message?: string } >;
}
) => {
  return (
    <div className='space-y-2'>
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} type={type} maxLength={maxLength} {...register(id)} />
        {
            errors[id]&&
            <p className='text-sm text-destructive'>errors[id]?.message</p>
        }
    </div>
  )
}

export default FormField