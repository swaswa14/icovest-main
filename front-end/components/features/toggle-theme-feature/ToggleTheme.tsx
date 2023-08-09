import useToggleTheme from '@/components/features/toggle-theme-feature/useToggleTheme'
import ToggleSwitch from '@/components/ToggleSwitch'
import { BsBrightnessHigh } from 'react-icons/bs'
import { MdDarkMode } from 'react-icons/md'
import { Tooltip } from 'flowbite-react'

export default function ToggleTheme() {
    const { checked, toggleTheme, label } = useToggleTheme()

    return (
        <Tooltip
            content={label}
            placement={'top'}
            style={checked ? 'dark' : 'light'}
        >
            <div>
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
