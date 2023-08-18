import { useApplicationContext } from '@/context/ApplicationProvider'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

export default function useToggleTheme() {
    const [label, setLabel] = useState('Light Mode')

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [checked, setChecked] = useState(false)
    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), [])

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
            setChecked(false)
            setLabel('Toggle Dark Mode')
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('icovest-theme', 'light')
            }
        } else {
            setTheme('dark')
            setLabel('Toggle Light Mode')
            setChecked(true)
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('icovest-theme', 'dark')
            }
        }
    }

    return { theme, label, toggleTheme, resolvedTheme, mounted, checked }
}
