import PageSeo from '@/components/PageSeo'
import LoginWrapper from '@/components/login/LoginWrapper'
import { useApplicationContext } from '@/context/ApplicationProvider'
import PageRedirect from '@/components/PageRedirect'

export default function LoginPage() {
    const { userDto } = useApplicationContext()
    if (userDto) {
        return <PageRedirect link={'/my'} delay={1000} />
    }
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
