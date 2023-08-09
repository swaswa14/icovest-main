import useAuthentication from '@/components/login/useAuthentication'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function useRegister() {
    const { registerSchema } = useAuthentication()
    type RegisterSchema = z.infer<typeof registerSchema>
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit: SubmitHandler<RegisterSchema> = async (schema) => {
        await new Promise(async (resolve) => {
            await setTimeout(() => {
                resolve(schema)
            }, 3000)
        })
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        onSubmit,
    }
}
