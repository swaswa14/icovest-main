import PageSeo from '@/components/PageSeo'
import RegisterWrapper from '@/components/login/RegisterWrapper'
import { useRouter } from 'next/router'

export default function RegisterPage() {
    const router = useRouter()
    const { token, expired } = router.query
    return (
        <>
            <PageSeo
                title={'Register'}
                description={'Create an Account'}
                keywords={['register', 'create account']}
            />
            <RegisterWrapper token={token} expired={expired} />
        </>
    )
}
