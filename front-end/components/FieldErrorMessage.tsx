import React from 'react'

export interface FieldErrorMessageProps {
    children: React.ReactNode
}
export default function FieldErrorMessage({
    children,
}: FieldErrorMessageProps) {
    return (
        <p className={'text-red-600 text-xs font-medium text-center mt-1'}>
            {children}
        </p>
    )
}
