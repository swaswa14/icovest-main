'use client'

import React from 'react'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import Link from 'next/link'
import AuthenticationContainer from '@/components/login/AuthenticationContainer'

import useLogin from '@/components/login/useLogin'
import FormField from '@/components/FormField'
import FormButton from '@/components/FormButton'

export default function LoginWrapper() {
    const { register, handleSubmit, errors, isSubmitting, onSubmit } =
        useLogin()
    return (
        <AuthenticationContainer title={'Sign in to your account'}>
            <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormField
                    id={'user'}
                    type={'email'}
                    placeholder={'name@email.com'}
                    isDisabled={isSubmitting}
                    label={'Email Address'}
                    errorMessage={errors.user?.message}
                    icon={MdEmail}
                    {...register('user')}
                />
                <FormField
                    id={'pass'}
                    placeholder={'••••••••'}
                    isDisabled={isSubmitting}
                    label={'Password'}
                    errorMessage={errors.pass?.message}
                    icon={RiLockPasswordFill}
                    {...register('pass')}
                    type={'password'}
                />
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
                <FormButton isSubmitting={isSubmitting} label={'Log in'} />
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
    )
}
