import ToggleTheme from '@/components/features/toggle-theme-feature/ToggleTheme'

export default function Home() {
    return (
        <div className={'flex flex-col justify-center text-center m-3'}>
            <div>Hello world!</div>
            <ToggleTheme />
        </div>
    )
}
