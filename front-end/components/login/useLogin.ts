import useAuthentication from '@/components/login/useAuthentication'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useApplicationContext } from '@/context/ApplicationProvider'
import { useState } from 'react'
import { ApiError } from '@/service/ApiError'

export interface AuthenticationResponse {
    message: string
    userDto: UserDto
}

export type UserDto = {
    id: number
    username: string
    email: string
    authorities: string[]
    balance: number
    invitationCode: string
    enabled: boolean
}
export interface Usdt {
    CURRENCY: string // Given it's a static constant in Java, it should ideally be declared outside the interface in TypeScript
    balance: string // using string to represent BigDecimal
}

export default function useLogin() {
    const { loginSchema } = useAuthentication()
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<ApiError>()
    type LoginSchema = z.infer<typeof loginSchema>
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        setError,
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    })
    const { setUserDto } = useApplicationContext()

    const onSubmit: SubmitHandler<LoginSchema> = async (schema) => {
        try {
            const response = await fetch('/api/v1/auth/authenticate', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(schema),
            })

            // Assuming you'd want to check the response, for example:
            if (response.ok) {
                const data: UserDto = await response.json()
                // console.log(data.message)
                console.log('authenticated user , ', data)
                setUserDto(data)
                router.reload()
            } else if (
                response.status === 403 ||
                response.status === 409 ||
                response.status === 404
            ) {
                const error: ApiError = await response.json()
                setError('pass', { message: ' ' })
                setError('user', { message: ' ' })
                setErrorMessage(error)
            }
        } catch (error) {
            console.error('Error while logging in:', error)
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        watch,
        onSubmit,
        errorMessage,
    }
}
