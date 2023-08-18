import { z } from 'zod'

export default function useAuthentication() {
    const email = z
        .string()
        .email({ message: 'Invalid Email' })
        .min(1, { message: 'Email is required' })

    const password = z
        .string()
        .min(8, {
            message: 'Password must be at least a minimum of 8 characters',
        })
        .refine(
            (value) => {
                return (
                    value.match(/[a-z]/g) &&
                    value.match(/[A-Z]/g) &&
                    value.match(/[0-9]/g)
                )
            },
            {
                message:
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
            }
        )

    const verifyPassword = z
        .string()
        .min(1, { message: 'Verify your password' })
    // .refine(
    //     (value) => {
    //         return (
    //             value.match(/[a-z]/g) &&
    //             value.match(/[A-Z]/g) &&
    //             value.match(/[0-9]/g)
    //         )
    //     },
    //     {
    //         message:
    //             'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    //     }
    // )

    const invitationCode = z.string().optional()

    const username = z.string().min(1, { message: 'username is required' })

    const user = z.string().min(1, { message: 'username/email is required' })
    const pass = z.string().min(1, { message: 'Password is required' })

    const loginSchema = z.object({
        user,
        pass,
    })

    const registerSchema = z
        .object({
            email,
            username,
            password,
            verifyPassword,
            invitationCode,
        })
        .refine(
            (data) => {
                return data.password === data.verifyPassword
            },
            { message: 'Passwords do not match', path: ['verifyPassword'] }
        )

    const forgotPasswordSchema = z.object({
        email,
    })

    return {
        loginSchema,
        registerSchema,
        forgotPasswordSchema,
    }
}
