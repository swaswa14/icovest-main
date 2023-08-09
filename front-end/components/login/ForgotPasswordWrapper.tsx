import AuthenticationContainer from '@/components/login/AuthenticationContainer'
import { Button, TextInput } from 'flowbite-react'

import { MdEmail } from 'react-icons/md'
import React from 'react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingIcons from 'react-loading-icons'

export default function ForgotPasswordWrapper() {
    const schema = z.object({
        email: z
            .string()
            .email({ message: 'Invalid Email' })
            .min(1, { message: 'Email is required' }),
    })

    type ResetPasswordSchema = z.infer<typeof schema>
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<ResetPasswordSchema> = async (schema) => {
        await new Promise(async (resolve) => {
            await setTimeout(() => {
                resolve(schema)
            }, 3000)
        })
    }

    return (
        <AuthenticationContainer
            title={'Reset your password'}
            backText={'Log in'}
            backLink={'/login'}
        >
            <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
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
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                        >
                            Your email
                        </label>
                        <TextInput
                            icon={MdEmail}
                            type="email"
                            id="email"
                            placeholder="name@company.com"
                            required
                            className={
                                'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                            }
                            color={errors.email?.message ? 'failure' : ''}
                            {...register('email')}
                            disabled={isSubmitting}
                        />
                        {errors.email?.message && (
                            <p className={'text-red-600'}>
                                {errors.email?.message}
                            </p>
                        )}
                    </div>
                )}
                {!isSubmitSuccessful && (
                    <Button
                        className="w-full"
                        type={'submit'}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <LoadingIcons.SpinningCircles
                                style={{ width: '1.5rem', height: '1.5rem' }}
                            />
                        ) : (
                            'Reset password'
                        )}
                    </Button>
                )}
            </form>
        </AuthenticationContainer>
    )
}
