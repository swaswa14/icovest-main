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
    userDto: UserDto | null
    setUserDto: Dispatch<SetStateAction<UserDto | null>>
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
    // @ts-ignore
    const [userDto, setUserDto] = useState<UserDto | null>(null)
    const value: ApplicationContextValue = {
        userDto,
        setUserDto,
    }

    useEffect(() => {
        const fetchData = async () => {
            const user = await getAuthenticatedUser()

            return user
        }
        fetchData().then((user) => {
            setUserDto(user)
        })
    }, [])

    return (
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    )
}
