import useAuthentication from '@/components/login/useAuthentication'
import { useState } from 'react'
import {
    changePassword,
    ChangePasswordRequest,
    CommonApiResponse,
} from '@/service/AuthenticationService'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'

export interface UseChangePasswordProps {
    token?: string | string[] | undefined
}
export default function useChangePassword({ token }: UseChangePasswordProps) {
    const { changePasswordSchema } = useAuthentication()
    const [changePasswordResponse, setChangePasswordResponse] = useState<
        CommonApiResponse | undefined
    >()
    const [loading, setLoading] = useState<boolean>(false)

    type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        watch,
    } = useForm<ChangePasswordSchema>({
        mode: 'onChange',
        resolver: zodResolver(changePasswordSchema),
    })

    const mutate = useMutation(changePassword, {
        onSuccess: async (response) => {
            const data = await response.json()
            setChangePasswordResponse(data)
            setLoading(false)
            console.log('Response from change password:', data)
        },
    })

    const onSubmit: SubmitHandler<ChangePasswordSchema> = async (schema) => {
        setLoading(true)
        const request: ChangePasswordRequest = {
            token: token,
            password: schema.password,
        }
        setTimeout(() => {
            mutate.mutate(request)
        }, 3000)
    }

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        changePasswordResponse,
        loading,
        watch,
    }
}
