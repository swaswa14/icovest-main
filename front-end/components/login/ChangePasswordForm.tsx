import { TextInput } from 'flowbite-react'
import { RiLockPasswordLine } from 'react-icons/ri'
import FieldErrorMessage from '@/components/FieldErrorMessage'
import React, { useEffect, useState } from 'react'
import FormButton from '@/components/FormButton'
import useChangePassword from '@/components/login/useChangePassword'
import { CommonApiResponse } from '@/service/AuthenticationService'

export interface ChangePasswordFormProps {
    token?: string | string[] | undefined
}
export default function ChangePasswordForm({ token }: ChangePasswordFormProps) {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        changePasswordResponse,
        loading,
        watch,
    } = useChangePassword({ token })
    const passwordValue = watch('password')
    const verifyPasswordValue = watch('verifyPassword')
    // State to check if both inputs are empty
    const [areInputsEmpty, setAreInputsEmpty] = useState(true)

    // Effect to check if both input values are empty
    useEffect(() => {
        setAreInputsEmpty(!passwordValue || !verifyPasswordValue)
    }, [passwordValue, verifyPasswordValue])
    return (
        <>
            {isSubmitSuccessful && changePasswordResponse ? (
                <SuccessMessage
                    title={'Password changed'}
                    response={changePasswordResponse}
                />
            ) : (
                <form
                    className="space-y-2 md:space-y-2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <label
                            htmlFor="change-password"
                            className="text-sm font-medium text-gray-500 dark:text-white"
                        >
                            Password
                        </label>
                        <TextInput
                            sizing={'sm'}
                            autoComplete={'change-password'}
                            icon={RiLockPasswordLine}
                            type="password"
                            id="change-password"
                            placeholder="Enter your password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                            required
                            color={
                                errors.password?.message ? 'failure' : 'gray'
                            }
                            {...register('password')}
                            disabled={isSubmitting}
                        />
                        {errors.password?.message && (
                            <FieldErrorMessage>
                                {errors.password?.message}
                            </FieldErrorMessage>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="verify-change-password"
                            className="text-sm font-medium text-gray-500 dark:text-white"
                        >
                            Verify Password
                        </label>
                        <TextInput
                            sizing={'sm'}
                            icon={RiLockPasswordLine}
                            type="password"
                            id="verify-change-password"
                            placeholder="Confirm your password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                            required
                            autoComplete={'verify-change-password'}
                            color={
                                errors.verifyPassword?.message
                                    ? 'failure'
                                    : 'gray'
                            }
                            {...register('verifyPassword')}
                            disabled={isSubmitting}
                        />
                        {errors.verifyPassword?.message && (
                            <FieldErrorMessage>
                                {errors.verifyPassword?.message}
                            </FieldErrorMessage>
                        )}
                    </div>
                    <FormButton
                        label={'Sign up'}
                        isSubmitting={isSubmitting || loading}
                        isDisabled={isSubmitting || loading || areInputsEmpty}
                    />
                </form>
            )}
        </>
    )
}

export interface SuccessMessageProps {
    title: string
    response?: CommonApiResponse
}
export function SuccessMessage({ title, response }: SuccessMessageProps) {
    return (
        <>
            <h5 className="text-2xl font-medium text-black dark:text-gray-50 text-center">
                {title}
            </h5>
            <br />
            <p className="text-xl font-light text-black dark:text-gray-50 text-center">
                {response?.message}
            </p>
            <br />
        </>
    )
}
