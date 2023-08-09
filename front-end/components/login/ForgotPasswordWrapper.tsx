import AuthenticationContainer from '@/components/login/AuthenticationContainer'
import { Button, TextInput } from 'flowbite-react'

import { MdEmail } from 'react-icons/md'
import React from 'react'

import LoadingIcons from 'react-loading-icons'
import useForgotPassword from '@/components/login/useForgotPassword'
import FormButton from '../FormButton'
import FormField from '../FormField'
import FormContainer from '@/components/FormContainer'

export default function ForgotPasswordWrapper() {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        onSubmit,
    } = useForgotPassword()

    return (
        <AuthenticationContainer
            title={'Reset your password'}
            backText={'Log in'}
            backLink={'/login'}
        >
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                {isSubmitSuccessful ? (
                    <>
                        <h5 className={'text-gray-700'}>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Success! We've sent an email with password reset
                            instructions to your inbox.
                        </h5>
                        <br />
                        <p>
                            Please check your email and follow the steps to
                            reset your password.
                        </p>
                    </>
                ) : (
                    // <div>
                    //     <label
                    //         htmlFor="email"
                    //         className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                    //     >
                    //         Your email
                    //     </label>
                    //     <TextInput
                    //         icon={MdEmail}
                    //         type="email"
                    //         id="email"
                    //         placeholder="name@company.com"
                    //         required
                    //         className={
                    //             'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                    //         }
                    //         color={errors.email?.message ? 'failure' : ''}
                    //         {...register('email')}
                    //         disabled={isSubmitting}
                    //     />
                    //     {errors.email?.message && (
                    //         <p className={'text-red-600'}>
                    //             {errors.email?.message}
                    //         </p>
                    //     )}
                    // </div>

                    <FormField
                        id="email"
                        {...register('email')}
                        type="email"
                        placeholder="email@email.com"
                        errorMessage={errors.email?.message}
                        isDisabled={isSubmitting}
                        label={'Your Email'}
                        icon={MdEmail}
                    />
                )}
                {!isSubmitSuccessful && (
                    <FormButton
                        label={'Reset Password'}
                        isSubmitting={isSubmitting}
                    />
                    //     className="w-full"
                    //     type={'submit'}
                    //     disabled={isSubmitting}
                    // >
                    //     {isSubmitting ? (
                    //         <LoadingIcons.SpinningCircles
                    //             style={{ width: '1.5rem', height: '1.5rem' }}
                    //         />
                    //     ) : (
                    //         'Reset password'
                    //     )}
                    // </FormButton>
                )}
            </FormContainer>
        </AuthenticationContainer>
    )
}
