import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
    ApplicationContextProvider,
    useApplicationContext,
} from '@/context/ApplicationProvider'
import React, { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import AuthenticatedLayout from '@/components/authenticated/AuthenticatedLayout'

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const { userDto } = useApplicationContext()
    const Layout = ({ children }: ChildComponentProps) => {
        if (router.pathname.includes('/my')) {
            return (
                <AuthenticatedLayout userDto={userDto}>
                    {children}
                </AuthenticatedLayout>
            )
        } else {
            return <>{children}</>
        }
    }

    return (
        <ApplicationContextProvider>
            <Layout>
                <ChildComponent>
                    <Component {...pageProps} />
                </ChildComponent>
            </Layout>
        </ApplicationContextProvider>
    )
}

export interface ChildComponentProps {
    children: ReactNode
}

const ChildComponent = ({ children }: ChildComponentProps) => {
    const { mode } = useApplicationContext()
    console.log(mode)

    return (
        <ThemeProvider
            enableSystem={true}
            attribute={'class'}
            forcedTheme={mode}
        >
            {children}
        </ThemeProvider>
    )
}
