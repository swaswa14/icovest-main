import { Button } from 'flowbite-react'
import React from 'react'
import LoadingIcons from 'react-loading-icons'

interface FormWrapperProps {
    label: string
    isSubmitting: boolean
}

export default function FormButton({ label, isSubmitting }: FormWrapperProps) {
    return (
        <Button className="w-full" type={'submit'} disabled={isSubmitting}>
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
