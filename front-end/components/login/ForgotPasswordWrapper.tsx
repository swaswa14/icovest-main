import AuthenticationContainer from '@/components/login/AuthenticationContainer'
import { TextInput } from 'flowbite-react'
import { MdEmail } from 'react-icons/md'
import React from 'react'
import useForgotPassword from '@/components/login/useForgotPassword'
import FormButton from '../FormButton'
import FieldErrorMessage from '@/components/FieldErrorMessage'
import ChangePasswordForm from '@/components/login/ChangePasswordForm'

export interface ForgotPasswordWrapperProps {
    token?: string | string[] | undefined
}
export default function ForgotPasswordWrapper({
    token,
}: ForgotPasswordWrapperProps) {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        onSubmit,
        forgotPasswordResponse,
        loading,
    } = useForgotPassword()

    return (
        <AuthenticationContainer
            title={'Reset your password'}
            backText={'Log in'}
            backLink={'/login'}
        >
            {token ? (
                <ChangePasswordForm token={token} />
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={'space-y-4 md:space-y-6'}
                >
                    {isSubmitSuccessful && forgotPasswordResponse ? (
                        <>
                            <h5
                                className={
                                    'text-sm font-medium text-gray-500 dark:text-white'
                                }
                            >
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                {forgotPasswordResponse?.message}
                            </h5>
                            <br />
                        </>
                    ) : (
                        <>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                                >
                                    Email/Username
                                </label>
                                <TextInput
                                    icon={MdEmail}
                                    type="text"
                                    id="email"
                                    placeholder="email@company.com / username"
                                    required
                                    className={
                                        'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                                    }
                                    color={
                                        errors.email?.message
                                            ? 'failure'
                                            : 'gray'
                                    }
                                    {...register('email')}
                                    disabled={isSubmitting}
                                />
                                {errors.email?.message && (
                                    <FieldErrorMessage>
                                        {errors.email?.message}
                                    </FieldErrorMessage>
                                )}
                            </div>

                            {(!isSubmitSuccessful ||
                                isSubmitting ||
                                loading ||
                                errors) && (
                                <FormButton
                                    label={'Reset Password'}
                                    isSubmitting={isSubmitting || loading}
                                    isDisabled={isSubmitting || loading}
                                />
                            )}
                        </>
                    )}
                </form>
            )}
        </AuthenticationContainer>
    )
}
