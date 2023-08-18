import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import useAuthentication from '@/components/login/useAuthentication'
import {
    FormErrorDto,
    RegistrationRequest,
    RegistrationResponse,
} from '@/service/AuthenticationService'

import {} from '@/service/ApiError'

export default function useRegister() {
    const { registerSchema } = useAuthentication()
    const [registerResponse, setRegisterResponse] =
        useState<RegistrationResponse>()
    const [checked, setChecked] = useState(false)
    type RegisterSchema = z.infer<typeof registerSchema>

    const {
        register,
        handleSubmit,
        setError,
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

        const request: RegistrationRequest = {
            email: schema.email,
            username: schema.username,
            password: schema.password,
            invitationCode: schema.invitationCode,
        }
        try {
            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request),
            })

            if (response.status === 201) {
                setRegisterResponse(await response.json())
            } else if (response.status === 422) {
                const errorResponse: FormErrorDto = await response.json()

                // Set the errors in the form
                errorResponse.errorList.forEach((err) => {
                    // @ts-ignore
                    setError(err.fieldName, {
                        message: err.errorMessage,
                    })
                })
            }
        } catch (error) {
            console.error('Error while registering:', error)
        }
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
        registerResponse,
    }
}
