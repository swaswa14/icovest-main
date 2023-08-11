import PageLoad from '@/components/PageRedirect'
import React from 'react'

export default function Home() {
    return <PageLoad link={'/login'} delay={500} />
}
