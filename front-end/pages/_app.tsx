import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApplicationContextProvider } from '@/context/ApplicationProvider'
import React, { memo, ReactNode, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import AuthenticatedLayout from '@/components/authenticated/AuthenticatedLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Flowbite } from 'flowbite-react'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <ApplicationContextProvider>
                    <ChildComponent>
                        <Component {...pageProps} />
                    </ChildComponent>
                </ApplicationContextProvider>
            </QueryClientProvider>
        </React.StrictMode>
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

    const Layout = ({ children }: ChildComponentProps) => {
        if (router.pathname.includes('/my')) {
            return <AuthenticatedLayout>{children}</AuthenticatedLayout>
        } else {
            return <>{children}</>
        }
    }

    return (
        <ThemeProvider
            attribute={'class'}
            defaultTheme={currentTheme}
            enableSystem={true}
        >
            <Flowbite>
                {' '}
                <Layout>{children}</Layout>
            </Flowbite>
        </ThemeProvider>
    )
})
