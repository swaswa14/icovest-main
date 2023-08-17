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
            const data = await response.json()
            console.log(data)
            console.log('authenticated user , ', data)
            return data
        } else {
            console.error('Failed to login:', response.statusText)
        }
    } catch (error) {
        console.error('Error while logging in:', error)
    }
}
