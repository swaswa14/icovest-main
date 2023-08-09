import PageSeo from '@/components/PageSeo'
import ForgotPasswordWrapper from '@/components/login/ForgotPasswordWrapper'

export default function ForgotPasswordPage() {
    return (
        <>
            <PageSeo
                title={'forgot password'}
                description={'Reset your Password'}
                keywords={['password', 'reset', 'forgot', 'email']}
            />
            <ForgotPasswordWrapper />
        </>
    )
}
