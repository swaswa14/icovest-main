import PageSeo from '@/components/PageSeo'
import LoginWrapper from '@/components/login/LoginWrapper'

export default function LoginPage() {
    return (
        <>
            <PageSeo
                title={'Log in page'}
                description={'Page for authentication'}
                keywords={['login', 'authentication']}
            />
            <LoginWrapper />
        </>
    )
}
