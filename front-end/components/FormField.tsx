import { TextInput, TextInputProps } from 'flowbite-react'
import React, {
    ComponentProps,
    FC,
    HTMLInputTypeAttribute,
    useRef,
} from 'react'

export interface FormFieldProps extends TextInputProps {
    id: string
    name: string | undefined
    type?: HTMLInputTypeAttribute | undefined
    placeholder: string | undefined
    required?: boolean | undefined
    className?: string | undefined
    isDisabled: boolean | undefined
    label: string | undefined
    errorMessage: string | undefined
    icon?: FC<ComponentProps<'svg'>>
}

export default function FormField({
    id,
    name,
    type = 'text',
    placeholder,
    required = false,
    isDisabled,
    label,
    icon,
    errorMessage,
    ...props
}: FormFieldProps) {
    // const inputRef = useRef<HTMLInputElement>(null)
    // const registerField = useForm()
    //
    // React.useEffect(() => {
    //     if (inputRef.current) {
    //         registerField(inputRef)
    //     }
    // }, [registerField])

    return (
        <div>
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
                {label}
            </label>
            <TextInput
                color={errorMessage ? 'failure' : 'gray'}
                icon={icon}
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                className={
                    'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                }
                disabled={isDisabled}
            />
            {errorMessage && <p className={'text-red-600'}>{errorMessage}</p>}
        </div>
    )
}
