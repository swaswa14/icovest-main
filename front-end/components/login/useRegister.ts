import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import useAuthentication from '@/components/login/useAuthentication'

export default function useRegister() {
    const { registerSchema } = useAuthentication()

    const [checked, setChecked] = useState(false)
    type RegisterSchema = z.infer<typeof registerSchema>
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<RegisterSchema>({
        mode: 'onChange',
        resolver: zodResolver(registerSchema),
    })

    const onSubmit: SubmitHandler<RegisterSchema> = async (schema) => {
        // eslint-disable-next-line no-async-promise-executor
        await new Promise(async (resolve) => {
            setTimeout(() => {
                resolve(schema)
            }, 3000)
        })
    }

    const onChanged = () => {
        setChecked(!checked)
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        onSubmit,
        checked,
        onChanged,
    }
}
