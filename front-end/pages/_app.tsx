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
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import { getAuthenticatedUser } from '@/service/AuthenticationService'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ApplicationContextProvider>
                <ChildComponent>
                    <Component {...pageProps} />
                </ChildComponent>
            </ApplicationContextProvider>
        </QueryClientProvider>
    )
}

export interface ChildComponentProps {
    children: ReactNode
}

const ChildComponent = ({ children }: ChildComponentProps) => {
    const { mode } = useApplicationContext()
    console.log(mode)
    const router = useRouter()
    const { userDto, setUserDto } = useApplicationContext()

    const { data } = useQuery({
        queryKey: ['fetchUserDto'],
        queryFn: () => getAuthenticatedUser().then((res) => res),
    })

    setUserDto(data)
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
        <ThemeProvider
            enableSystem={true}
            attribute={'class'}
            forcedTheme={mode}
        >
            <Layout>{children}</Layout>
        </ThemeProvider>
    )
}
