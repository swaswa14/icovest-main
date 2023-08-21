'use client'

import React from 'react'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import Link from 'next/link'
import AuthenticationContainer from '@/components/login/AuthenticationContainer'
import useLogin from '@/components/login/useLogin'
import FormButton from '@/components/FormButton'
import { TextInput } from 'flowbite-react'
import PageLoad from '@/components/PageRedirect'
import FieldErrorMessage from '@/components/FieldErrorMessage'

export default function LoginWrapper() {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        isSubmitSuccessful,
    } = useLogin()
    return (
        <>
            {isSubmitSuccessful ? (
                <PageLoad link={'/my'} />
            ) : (
                <AuthenticationContainer title={'Sign in to your account'}>
                    <form
                        className="space-y-2 md:space-y-2"
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete={'off'}
                    >
                        <div>
                            <label
                                htmlFor="login-user"
                                className="text-sm font-medium text-gray-500 dark:text-white"
                            >
                                Email/Username
                            </label>
                            <TextInput
                                icon={MdEmail}
                                type="text"
                                id="login-user"
                                autoComplete={'login-user'}
                                sizing={'sm'}
                                required
                                placeholder={'company@mail.com / username'}
                                className={
                                    'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg '
                                }
                                color={
                                    errors.user?.message ? 'failure' : 'gray'
                                }
                                {...register('user')}
                                disabled={isSubmitting}
                            />
                            {errors.user?.message && (
                                <p className={'text-red-600'}>
                                    {errors.user?.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="login-password"
                                className="text-sm font-medium text-gray-500 dark:text-white"
                            >
                                Password
                            </label>
                            <TextInput
                                icon={RiLockPasswordFill}
                                type="password"
                                id="login-password"
                                autoComplete={'login-password'}
                                sizing={'sm'}
                                placeholder="password"
                                required
                                className={
                                    'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                                }
                                color={
                                    errors.pass?.message ? 'failure' : 'gray'
                                }
                                {...register('pass')}
                                disabled={isSubmitting}
                            />
                            {errors.pass?.message && (
                                <p className={'text-red-600'}>
                                    {errors.pass?.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="remember"
                                        aria-describedby="remember"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="remember"
                                        className="text-gray-500 dark:text-gray-300"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <Link
                                href="/forgot"
                                className="text-cyan-600 hover:underline dark:text-cyan-500"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <FormButton
                            isSubmitting={isSubmitting}
                            label={'Log in'}
                        />
                        {errors.pass?.message?.trim() === '' && errors && (
                            <FieldErrorMessage>
                                {'Invalid Credentials'}
                            </FieldErrorMessage>
                        )}
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet?{' '}
                            <Link
                                href="/register"
                                className="text-cyan-600 hover:underline dark:text-cyan-500"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </AuthenticationContainer>
            )}
        </>
    )
}
