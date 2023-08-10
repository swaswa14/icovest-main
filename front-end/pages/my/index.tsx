import PageSeo from '@/components/PageSeo'

export default function MyPage() {
    return (
        <>
            <PageSeo
                title={'Dashboard'}
                description={'Private Page'}
                keywords={['dashboard', 'private', 'page']}
            />
            <>Hello</>
        </>
    )
}
