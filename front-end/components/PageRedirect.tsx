import React, { useEffect } from 'react'
import { ThreeDots } from 'react-loading-icons'

import { useRouter } from 'next/router'

export interface PageRedirectProps {
    link: string
    delay?: number
}
export default function PageRedirect({
    link,
    delay = 3000,
}: PageRedirectProps) {
    const router = useRouter()

    useEffect(() => {
        const redirectAfterDelay = async () => {
            await new Promise((res) => setTimeout(res, delay))
            router.push(link)
        }

        redirectAfterDelay()

        // Cleanup the timeout if the component unmounts before 3 seconds
        return () => {
            // @ts-ignore
            clearTimeout(redirectAfterDelay)
        }
    }, [link, router])

    return (
        <div className={'h-screen'}>
            <ThreeDots
                fill={'#0f766e'}
                className={
                    'flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-48 w-48'
                }
            />
        </div>
    )
}
