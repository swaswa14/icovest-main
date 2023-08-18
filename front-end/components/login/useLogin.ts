import useAuthentication from '@/components/login/useAuthentication'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
}
export interface Usdt {
    CURRENCY: string // Given it's a static constant in Java, it should ideally be declared outside the interface in TypeScript
    balance: string // using string to represent BigDecimal
}

export default function useLogin() {
    const { loginSchema } = useAuthentication()
    type LoginSchema = z.infer<typeof loginSchema>
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        setError,
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
                const data = await response.json()
                console.log(data.message)
            } else {
                setError('pass', { message: ' ' })
                setError('user', { message: ' ' })
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
        onSubmit,
    }
}
