import { Sidebar } from 'flowbite-react'
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiViewBoards,
} from 'react-icons/hi'

export default function LogoBranding() {
    return (
        <Sidebar aria-label="Sidebar with logo branding example">
            <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
                <p>Flowbite</p>
            </Sidebar.Logo>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={HiChartPie}>
                        <p>Dashboard</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiViewBoards}>
                        <p>Kanban</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiInbox}>
                        <p>Inbox</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiUser}>
                        <p>Users</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiShoppingBag}>
                        <p>Products</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiArrowSmRight}>
                        <p>Sign In</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiTable}>
                        <p>Sign Up</p>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
