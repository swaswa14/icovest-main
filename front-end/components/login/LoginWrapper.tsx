'use client'

import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import Link from 'next/link'
import AuthenticationContainer from '@/components/login/AuthenticationContainer'

export default function LoginWrapper() {
    return (
        <AuthenticationContainer title={'Sign in to your account'}>
            <form className="space-y-4 md:space-y-6" action="#">
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
                        name="email"
                        id="email"
                        placeholder="name@company.com"
                        required
                        className={
                            'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                    >
                        Password
                    </label>
                    <TextInput
                        icon={RiLockPasswordLine}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                required
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
                <Button className="w-full">Sign in</Button>
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
