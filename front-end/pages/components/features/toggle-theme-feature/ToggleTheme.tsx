import useToggleTheme from '@/pages/components/features/toggle-theme-feature/useToggleTheme'
import ToggleSwitch from '@/pages/components/ToggleSwitch'
import { BsBrightnessHigh } from 'react-icons/bs'
import { MdDarkMode } from 'react-icons/md'
import { Tooltip } from 'flowbite-react'

export default function ToggleTheme() {
    const { checked, toggleTheme, label } = useToggleTheme()

    return (
        <Tooltip
            content={label}
            className={'scale-50'}
            placement={'top'}
            style={checked ? 'dark' : 'light'}
        >
            <div className={'scale-75'}>
                <ToggleSwitch
                    onToggle={toggleTheme}
                    label={checked ? <MdDarkMode /> : <BsBrightnessHigh />}
                    checked={checked}
                    size={'small'}
                />
            </div>
        </Tooltip>
    )
}
