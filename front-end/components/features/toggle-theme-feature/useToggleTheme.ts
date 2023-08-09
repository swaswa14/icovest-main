import { useApplicationContext } from '@/context/ApplicationProvider'
import React, { ReactNode, useEffect, useState } from 'react'

export default function useToggleTheme() {
    const { mode, setMode } = useApplicationContext()
    const [checked, setChecked] = useState(mode === 'dark')
    const [label, setLabel] = useState('Light Mode')

    useEffect(() => {
        if (mode === 'dark') {
            setChecked(true)
            setLabel('Toggle Light Mode')
        } else {
            setChecked(false)
            setLabel('Toggle Dark Mode')
        }
    }, [])

    const toggleTheme = () => {
        if (mode === 'dark') {
            setMode('light')
            setChecked(false)
            setLabel('Toggle Dark Mode')
        } else {
            setMode('dark')
            setChecked(true)
            setLabel('Toggle Light Mode')
        }
    }

    return { checked, label, toggleTheme }
}
