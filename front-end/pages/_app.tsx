import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
    ApplicationContextProvider,
    useApplicationContext,
} from '@/context/ApplicationProvider'
import React, { memo, ReactNode, useEffect } from 'react'
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

// eslint-disable-next-line react/display-name
const ChildComponent = memo(({ children }: ChildComponentProps) => {
    const [currentTheme, setCurrentTheme] = React.useState<'dark' | 'light'>()

    useEffect(() => {
        setCurrentTheme(defaultTheme())
    }, [])
    const defaultTheme = () => {
        if (typeof window !== 'undefined') {
            const storedMode = window.localStorage.getItem('icovest-theme') as
                | 'dark'
                | 'light'
            if (storedMode) {
                return storedMode
            } else {
                return 'light'
            }
        } else {
            return 'light'
        }
    }
    const router = useRouter()
    const { userDto, setUserDto } = useApplicationContext()

    const { data } = useQuery({
        queryKey: ['fetchUserDto'],
        queryFn: () =>
            getAuthenticatedUser().then((res) => {
                if (res === null) {
                    console.log('User is not logged in')
                }
                return res
            }),
    })

    useEffect(() => {
        if (data) {
            setUserDto(data)
        }
    }, [userDto, setUserDto, data])
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
        <ThemeProvider attribute={'class'} defaultTheme={currentTheme}>
            <Layout>{children}</Layout>
        </ThemeProvider>
    )
})
