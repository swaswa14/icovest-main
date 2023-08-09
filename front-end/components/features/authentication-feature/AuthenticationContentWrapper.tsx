import { ReactNode } from 'react'

export interface AuthenticationContentWrapperProps {
    children: ReactNode
}

export default function AuthenticationContentWrapper({
    children,
}: AuthenticationContentWrapperProps) {
    return (
        <div
            className={'flex flex-col justify-center items-center w-full mt-5'}
        >
            {children}
        </div>
    )
}
