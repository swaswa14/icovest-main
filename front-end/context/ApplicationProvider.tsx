import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react'
import { UserDto } from '@/components/login/useLogin'
import { getAuthenticatedUser } from '@/service/AuthenticationService'

export interface ApplicationContextValue {
    mode: 'dark' | 'light'
    setMode: Dispatch<SetStateAction<'dark' | 'light'>>
    userDto: UserDto | undefined
    setUserDto: Dispatch<SetStateAction<UserDto | undefined>>
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
    // @ts-ignore
    const [userDto, setUserDto] = useState<UserDto>()
    const value: ApplicationContextValue = {
        mode,
        setMode,
        userDto,
        setUserDto,
    }

    useEffect(() => {
        // Check if running in a browser environment
        if (typeof window !== 'undefined') {
            const storedMode = window.localStorage.getItem('icovest-theme') as
                | 'dark'
                | 'light'
            if (storedMode) {
                setMode(storedMode)
            }
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const user = await getAuthenticatedUser()

            return user
        }
        fetchData()
            .then((user) => {
                setUserDto(user)
            })
            .finally(() => {
                console.log('User fetched')
            })
    }, [])

    return (
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    )
}
