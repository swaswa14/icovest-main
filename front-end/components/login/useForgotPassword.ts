import useAuthentication from '@/components/login/useAuthentication'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function useForgotPassword() {
    const { forgotPasswordSchema } = useAuthentication()

    type ResetPasswordSchema = z.infer<typeof forgotPasswordSchema>
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmit: SubmitHandler<ResetPasswordSchema> = async (schema) => {
        // eslint-disable-next-line no-async-promise-executor
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
