import { UserDto } from '@/components/login/useLogin'

// @ts-ignore
export const getAuthenticatedUser = async (): Promise<UserDto | null> => {
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
            return null
        }
    } catch (error) {
        console.log('Error while logging in:', error)
    }
}

export const logout = async (): Promise<Response | undefined> => {
    console.log('logout')
    try {
        return await fetch('/api/v1/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        })
    } catch (error) {
        console.error('Error while logging out:', error)
    }
}

export interface CommonApiResponse {
    status: 'SUCCESS' | 'ERROR' | 'FAILURE'
    message: string
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

export interface ResendEmailVerificationRequestProps {
    email: string
}
export const resendEmailVerification = async (
    request: ResendEmailVerificationRequestProps
): Promise<CommonApiResponse> => {
    console.log('resendEmailVerification request ', request)
    const response = await fetch(
        `/api/v1/auth/send-verification-email?email=${request.email}`,
        {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }
    )
    return response.json()
}

export interface ForgotPasswordRequest {
    email: string
}
export const forgotPassword = async (
    request: ForgotPasswordRequest
): Promise<Response> => {
    console.log('forgotPassword request ', request)
    return await fetch(`/api/v1/auth/forgot-password?email=${request.email}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    })
}

export interface ChangePasswordRequest {
    token: string | string[] | undefined
    password: string
}

export const changePassword = async (request: ChangePasswordRequest) => {
    console.log('changePassword request ', request)
    return await fetch('/api/v1/auth/change-password', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })
}

export function getCookie(name: string) {
    let cookie = {}
    document.cookie.split(';').forEach(function (el) {
        let [k, v] = el.split('=')
        // @ts-ignore
        cookie[k.trim()] = v
    })
    // @ts-ignore
    return cookie[name]
}
