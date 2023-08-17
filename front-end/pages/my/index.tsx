import PageSeo from '@/components/PageSeo'
//import { useApplicationContext } from '@/context/ApplicationProvider'

import { useApplicationContext } from '@/context/ApplicationProvider'

export default function MyPage() {
    const { userDto } = useApplicationContext()
    // setUserDto(user)
    //
    // console.log(user)
    return (
        <>
            <PageSeo
                title={'Dashboard'}
                description={'Private Page'}
                keywords={['dashboard', 'private', 'page']}
            />
            {userDto === null && <h1>Not logged in</h1>}
            {userDto !== null && (
                <>
                    <h1>Logged in</h1>
                    <h1>Hello {userDto?.username}</h1>
                    <h2>Authorities</h2>
                    <ul>
                        {userDto?.authorities.map((authority, index) => (
                            <li key={index}>{authority}</li>
                        ))}
                    </ul>
                </>
            )}
        </>
    )
}
