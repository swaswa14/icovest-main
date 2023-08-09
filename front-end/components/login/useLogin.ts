import useAuthentication from '@/components/login/useAuthentication'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function useLogin() {
    const { loginSchema } = useAuthentication()
    type LoginSchema = z.infer<typeof loginSchema>
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit: SubmitHandler<LoginSchema> = async (schema) => {
        // eslint-disable-next-line no-async-promise-executor
        await new Promise(async (resolve) => {
            setTimeout(() => {
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
