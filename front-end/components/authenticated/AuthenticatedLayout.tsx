import LogoBranding from '@/components/authenticated/LogoBranding'
import { ReactNode } from 'react'
import { useApplicationContext } from '@/context/ApplicationProvider'

import PageRedirect from '@/components/PageRedirect'
import { UserDto } from '@/components/login/useLogin'

export interface AuthenticatedLayoutProps {
    children: ReactNode
    userDto: UserDto | undefined
}

export default function AuthenticatedLayout({
    children,
    userDto,
}: AuthenticatedLayoutProps) {
    // Changed to empty dependency array to fetch user only on component mount.

    return typeof userDto !== 'undefined' ? (
        <div className={'flex flex-row h-screen'}>
            <LogoBranding />
            <div className={'flex-grow justify-center flex mt-4'}>
                {children}
            </div>
            <div className={'w-1/6 border-l'}> </div>
        </div>
    ) : (
        <PageRedirect link={'/login'} delay={500} />
    )
}
