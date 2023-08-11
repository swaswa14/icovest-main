import React, { ReactNode } from 'react'

import { useRouter } from 'next/router'

import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import ToggleTheme from '@/components/features/toggle-theme-feature/ToggleTheme'
import Image from 'next/image'

export interface AuthenticationContainerProps {
    title: string
    children: ReactNode
    backLink?: string
    backText?: string
}
export default function AuthenticationContainer({
    title,
    children,
    backLink,
}: AuthenticationContainerProps) {
    const router = useRouter()
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <Image
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                        width={32}
                        height={32}
                    />
                    Flowbite
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className={'flex mt-4 ml-4 mb-0 mr-4 flex-row'}>
                        <div className={'flex flex-grow'}>
                            {backLink && (
                                <MdOutlineKeyboardBackspace
                                    className={'h-8 w-8'}
                                    type={'link'}
                                    cursor={'pointer'}
                                    onClick={() => router.push('/login')}
                                />
                            )}
                        </div>
                        <ToggleTheme />
                    </div>

                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {title}
                        </h1>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}
