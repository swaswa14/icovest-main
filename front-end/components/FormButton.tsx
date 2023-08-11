import { Button } from 'flowbite-react'
import React from 'react'
import LoadingIcons from 'react-loading-icons'

interface FormWrapperProps {
    label: string
    isSubmitting: boolean
    isDisabled?: boolean
}

export default function FormButton({
    label,
    isSubmitting,
    isDisabled,
}: FormWrapperProps) {
    return (
        <Button
            className="w-full"
            type={'submit'}
            disabled={isSubmitting || isDisabled}
        >
            {isSubmitting ? (
                <LoadingIcons.SpinningCircles
                    style={{ width: '1.5rem', height: '1.5rem' }}
                />
            ) : (
                label
            )}
        </Button>
    )
}
