import LogoBranding from '@/components/authenticated/LogoBranding'
import { ReactNode } from 'react'
import { useApplicationContext } from '@/context/ApplicationProvider'

import PageRedirect from '@/components/PageRedirect'

export interface AuthenticatedLayoutProps {
    children: ReactNode
}

export default function AuthenticatedLayout({
    children,
}: AuthenticatedLayoutProps) {
    // Changed to empty dependency array to fetch user only on component mount.
    const { userDto } = useApplicationContext()
    return userDto ? (
        <div className={'flex flex-row h-screen'}>
            <LogoBranding />
            <div className={'flex-grow justify-center flex mt-4'}>
                {children}
            </div>
            <div className={'w-1/6 border-l'}> </div>
        </div>
    ) : (
        <PageRedirect link={'/login'} delay={1500} />
    )
}
