import PageSeo from '@/components/PageSeo'
import RegisterWrapper from '@/components/login/RegisterWrapper'

export default function RegisterPage() {
    return (
        <>
            <PageSeo
                title={'Register'}
                description={'Create an Account'}
                keywords={['register', 'create account']}
            />
            <RegisterWrapper />
        </>
    )
}
