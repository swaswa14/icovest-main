import PageSeo from '@/components/PageSeo'
import ForgotPasswordWrapper from '@/components/login/ForgotPasswordWrapper'
import { useRouter } from 'next/router'

export default function ForgotPasswordPage() {
    const router = useRouter()
    const { token } = router.query
    return (
        <>
            <PageSeo
                title={'forgot password'}
                description={'Reset your Password'}
                keywords={['password', 'reset', 'forgot', 'email']}
            />
            <ForgotPasswordWrapper token={token} />
        </>
    )
}
