import { UserDto } from '@/components/login/useLogin'

export const getAuthenticatedUser = async (): Promise<UserDto | undefined> => {
    console.log('getAuthenticatedUser')
    try {
        const response = await fetch('/api/v1/auth/authenticated', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            return await response.json()
        } else {
            console.log('Failed to login:', response.statusText)
        }
    } catch (error) {
        console.log('Error while logging in:', error)
    }
}

export const logout = async (): Promise<string | undefined> => {
    console.log('logout')
    try {
        const response = await fetch('/api/v1/auth/logout', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            const data = await response.json()
            console.log(data)
            console.log('authenticated user , ', data)
            return data
        }
    } catch (error) {
        console.error('Error while logging out:', error)
    }
}

export interface RegistrationRequest {
    email: string
    username: string
    password: string
    invitationCode?: string
}
export interface RegistrationResponse {
    header: string
    body: string
    footer: string
}

export interface SpecificFieldError {
    fieldName: string
    rejectedValue: string
    errorMessage: string
    exceptionName: string
    constraint: string
}

export interface FormErrorDto {
    numberOfErrors: number
    errorList: SpecificFieldError[]
    status: string
    exception: string
}
export const registerUser = async (
    request: RegistrationRequest
): Promise<Response> => {
    console.log('register request ', request)
    const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })
    return response
}
