import { Sidebar } from 'flowbite-react'
import {
    HiArrowSmLeft,
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiViewBoards,
} from 'react-icons/hi'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/service/AuthenticationService'
import { useApplicationContext } from '@/context/ApplicationProvider'
import { useRouter } from 'next/router'

export default function LogoBranding() {
    const { setUserDto } = useApplicationContext()
    const router = useRouter()
    // Using useMutation for logout
    const mutation = useMutation(logout, {
        onSuccess: () => {
            setUserDto(undefined)
            router.reload()
        },
    })

    const handleLogout = async () => {
        try {
            const data = mutation.mutate()

            console.log(data)
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }
    return (
        <Sidebar
            aria-label="Sidebar with logo branding example"
            className="w-auto sm:w-full"
        >
            <Sidebar.Logo
                href="#"
                img="/favicon.svg"
                imgAlt="Flowbite logo"
                className={'hidden sm:block'}
            >
                <p className={'hidden sm:block'}>Flowbite</p>
            </Sidebar.Logo>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        href="#"
                        icon={HiChartPie}
                        className="w-auto sm:w-full"
                    >
                        <p className={'hidden sm:block'}>Dashboard</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiViewBoards}>
                        <p className={'hidden sm:block'}>Kanban</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiInbox}>
                        <p className={'hidden sm:block'}>Inbox</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiUser}>
                        <p className={'hidden sm:block'}>Users</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiShoppingBag}>
                        <p className={'hidden sm:block'}>Products</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiArrowSmRight}>
                        <p className={'hidden sm:block'}>Sign In</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiTable}>
                        <p className={'hidden sm:block'}>Sign Up</p>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        href="#"
                        icon={HiArrowSmLeft}
                        onClick={handleLogout}
                    >
                        <p className={'hidden sm:block'}>Sign Out</p>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
