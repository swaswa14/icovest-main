import AuthenticationContainer from '@/components/login/AuthenticationContainer'
import React from 'react'

export interface SuccessRegisterMessageProps {
    head: string
    email: string
    footer: string
}
export default function SuccessRegisterMessage({
    head,
    email,
    footer,
}: SuccessRegisterMessageProps) {
    return (
        <AuthenticationContainer title={head}>
            <>
                <br />
                <p className="text-sm font-light text-black dark:text-gray-50">
                    An email has been sent to{' '}
                    <span className="text-sm font-extrabold text-black dark:text-gray-50">
                        {email}
                    </span>{' '}
                    . Please click on the link to activate your account.
                </p>
                <br />
                <p className="text-sm font-light text-black dark:text-gray-50">
                    {footer}
                </p>
            </>
        </AuthenticationContainer>
    )
}
