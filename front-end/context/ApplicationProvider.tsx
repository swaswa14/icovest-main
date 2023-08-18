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
    // @ts-ignore
    const [userDto, setUserDto] = useState<UserDto>()
    const value: ApplicationContextValue = {
        userDto,
        setUserDto,
    }

    useEffect(() => {
        const fetchData = async () => {
            const user = await getAuthenticatedUser()

            return user
        }
        fetchData()
            .then((user) => {
                setUserDto(user)
            })
            .catch((error) => {
                console.log(error)
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
