import React, {
    createContext,
    FormEvent,
    FormEventHandler,
    ReactNode,
    useContext,
    useRef,
} from 'react'

type RegisterFieldType = (fieldRef: React.RefObject<HTMLInputElement>) => void

const FormContext = createContext<RegisterFieldType | null>(null)

export const useForm = (): RegisterFieldType => {
    const context = useContext(FormContext)
    if (!context) {
        throw new Error('useForm must be used within a FormProvider')
    }
    return context
}

type FormProps = {
    children: ReactNode
    onSubmit: FormEventHandler<HTMLFormElement> | undefined
}

export default function FormContainer({ children, onSubmit }: FormProps) {
    const fieldsRef = useRef<React.RefObject<HTMLInputElement>[]>([])

    const registerField = (fieldRef: React.RefObject<HTMLInputElement>) => {
        fieldsRef.current.push(fieldRef)
    }

    return (
        <FormContext.Provider value={registerField}>
            <form onSubmit={onSubmit}>{children}</form>
        </FormContext.Provider>
    )
}
