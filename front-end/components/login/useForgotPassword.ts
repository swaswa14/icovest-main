import useAuthentication from '@/components/login/useAuthentication'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    CommonApiResponse,
    forgotPassword,
    ForgotPasswordRequest,
    FormErrorDto,
} from '@/service/AuthenticationService'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

export default function useForgotPassword() {
    const { forgotPasswordSchema } = useAuthentication()
    const [forgotPasswordResponse, setForgotPasswordResponse] = useState<
        CommonApiResponse | undefined
    >()
    type ResetPasswordSchema = z.infer<typeof forgotPasswordSchema>
    const [loading, setLoading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        setError,
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
    })
    const mutate = useMutation(forgotPassword, {
        onSuccess: async (response) => {
            if (response.status === 200) {
                setForgotPasswordResponse(await response.json())
                console.log(
                    'Response from forgot password:',
                    forgotPasswordResponse
                )
            } else if (response.status === 422) {
                const errorResponse: FormErrorDto = await response.json()

                // Set the errors in the form
                errorResponse.errorList.forEach((err) => {
                    // @ts-ignore
                    setError(err.fieldName, {
                        message: err.errorMessage,
                    })
                })
            } else if (response.status === 404) {
                const errorResponse = await response.json()
                console.log('Response from forgot password:', errorResponse)
                setError('email', { message: errorResponse?.errorMessage })
            }

            setLoading(false)
        },
    })
    const onSubmit: SubmitHandler<ResetPasswordSchema> = async (schema) => {
        setLoading(true)
        const request: ForgotPasswordRequest = {
            email: schema.email,
        }
        setTimeout(() => {
            mutate.mutate(request)
        }, 3000)
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        forgotPasswordResponse,
        onSubmit,
        loading,
    }
}
