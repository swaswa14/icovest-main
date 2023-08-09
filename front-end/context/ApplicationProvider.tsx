import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from 'react'

export interface ApplicationContextValue {
    mode: 'dark' | 'light'
    setMode: Dispatch<SetStateAction<'dark' | 'light'>>
}

export const ApplicationContext = createContext<ApplicationContextValue | null>(
    null
)

export const useApplicationContext = () => {
    const context = useContext(ApplicationContext)
    if (!context) {
        throw new Error(
            'useApplicationContext must be used within a ApplicationContextProvider'
        )
    }
    return context
}

export interface ApplicationContextProviderProps {
    children: React.ReactNode
}

export const ApplicationContextProvider = ({
    children,
}: ApplicationContextProviderProps) => {
    const [mode, setMode] = useState<'dark' | 'light'>('light')
    const value: ApplicationContextValue = {
        mode,
        setMode,
    }
    return (
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    )
}
