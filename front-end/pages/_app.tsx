import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
    ApplicationContextProvider,
    useApplicationContext,
} from '@/context/ApplicationProvider'
import React, { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApplicationContextProvider>
            <ChildComponent>
                <Component {...pageProps} />
            </ChildComponent>
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
