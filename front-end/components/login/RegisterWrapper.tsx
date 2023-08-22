import AuthenticationContainer from '@/components/login/AuthenticationContainer'
import { Button, Checkbox, Label, TextInput, Tooltip } from 'flowbite-react'
import { MdEmail } from 'react-icons/md'
import { BsFillFilePersonFill } from 'react-icons/bs'
import { RiLockPasswordLine, RiMailSendLine } from 'react-icons/ri'
import Link from 'next/link'
import { AiOutlineNumber } from 'react-icons/ai'
import useRegister from '@/components/login/useRegister'
import FormButton from '@/components/FormButton'
import FieldErrorMessage from '@/components/FieldErrorMessage'
import React, { useEffect, useState } from 'react'
import PageRedirect from '@/components/PageRedirect'
import {
    resendEmailVerification,
    ResendEmailVerificationRequestProps,
} from '@/service/AuthenticationService'
import LoadingIcons from 'react-loading-icons'
import { useMutation } from '@tanstack/react-query'

export interface RegisterWrapperProps {
    token?: string | string[] | undefined
    expired?: string | string[] | undefined
    inviteCode?: string | string[] | undefined
}
export default function RegisterWrapper({
    token,
    expired,
    inviteCode,
}: RegisterWrapperProps) {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        onSubmit,
        onChanged,

        checked,
        registerResponse,
    } = useRegister()
    const [redirectToLogin, setRedirectToLogin] = useState(false)
    useEffect(() => {
        if (expired !== 'true') {
            // This will set the `redirectToLogin` state to true after 5 seconds
            const timer = setTimeout(() => {
                setRedirectToLogin(true)
            }, 5_000)

            // Cleanup function to clear the timeout if the component unmounts
            return () => clearTimeout(timer)
        }
    }, [expired])

    if (token) {
        return (
            <>
                {redirectToLogin ? (
                    <PageRedirect link={'/login'} />
                ) : (
                    <AuthenticationContainer title={'Email Verification'}>
                        <div className={'flex flex-col gap-2'}>
                            {expired === 'true' ? (
                                <p>
                                    Token already expired Please send email
                                    verification again!
                                </p>
                            ) : (
                                <p>Account is now enabled!</p>
                            )}
                        </div>
                    </AuthenticationContainer>
                )}
            </>
        )
    }
    return (
        <>
            {isSubmitSuccessful && registerResponse ? (
                <SuccessRegisterMessage
                    head={registerResponse.header}
                    email={registerResponse.body}
                    footer={registerResponse.footer}
                />
            ) : (
                <AuthenticationContainer
                    title={'Create your account'}
                    backLink={'/login'}
                    backText={'Log in'}
                >
                    <form
                        className="space-y-2 md:space-y-2"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <>
                            <div>
                                <label
                                    htmlFor="register-email"
                                    className="text-sm font-medium text-gray-500 dark:text-white"
                                >
                                    Email
                                </label>
                                <TextInput
                                    icon={MdEmail}
                                    type="email"
                                    id="register-email"
                                    placeholder="username@company.com"
                                    autoComplete={'new-email'}
                                    required
                                    sizing={'sm'}
                                    className={
                                        'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                                    }
                                    color={
                                        errors.email?.message
                                            ? 'failure'
                                            : 'gray'
                                    }
                                    {...register('email')}
                                    disabled={isSubmitting}
                                />
                                {errors.email?.message && (
                                    <FieldErrorMessage>
                                        {errors.email?.message}
                                    </FieldErrorMessage>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="icovest-username"
                                    className="text-sm font-medium text-gray-500 dark:text-white"
                                >
                                    Username
                                </label>
                                <TextInput
                                    icon={BsFillFilePersonFill}
                                    type="text"
                                    id="icovest-username"
                                    placeholder="john.doe"
                                    sizing={'sm'}
                                    required
                                    autoComplete={'new-username'}
                                    className={
                                        'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                                    }
                                    color={
                                        errors.username?.message
                                            ? 'failure'
                                            : 'gray'
                                    }
                                    {...register('username')}
                                    disabled={isSubmitting}
                                />
                                {errors.username?.message && (
                                    <FieldErrorMessage>
                                        {errors.username?.message}
                                    </FieldErrorMessage>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="icovest-password"
                                    className="text-sm font-medium text-gray-500 dark:text-white"
                                >
                                    Password
                                </label>
                                <TextInput
                                    sizing={'sm'}
                                    autoComplete={'new-password'}
                                    icon={RiLockPasswordLine}
                                    type="password"
                                    id="icovest-password"
                                    placeholder="Enter your password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                                    required
                                    color={
                                        errors.password?.message
                                            ? 'failure'
                                            : 'gray'
                                    }
                                    {...register('password')}
                                    disabled={isSubmitting}
                                />
                                {errors.password?.message && (
                                    <FieldErrorMessage>
                                        {errors.password?.message}
                                    </FieldErrorMessage>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="verify-password"
                                    className="text-sm font-medium text-gray-500 dark:text-white"
                                >
                                    Verify Password
                                </label>
                                <TextInput
                                    sizing={'sm'}
                                    icon={RiLockPasswordLine}
                                    type="password"
                                    id="verify-password"
                                    placeholder="Confirm your password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                                    required
                                    autoComplete={'verify-password'}
                                    color={
                                        errors.verifyPassword?.message
                                            ? 'failure'
                                            : 'gray'
                                    }
                                    {...register('verifyPassword')}
                                    disabled={isSubmitting}
                                />
                                {errors.verifyPassword?.message && (
                                    <FieldErrorMessage>
                                        {errors.verifyPassword?.message}
                                    </FieldErrorMessage>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="invite-code"
                                    className=" text-sm font-medium text-gray-500 dark:text-white"
                                >
                                    Invitation code(Optional)
                                </label>
                                <TextInput
                                    sizing={'sm'}
                                    icon={AiOutlineNumber}
                                    type="number"
                                    id="invite-code"
                                    placeholder=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                                    defaultValue={inviteCode}
                                    autoComplete={'invite-code'}
                                    style={{ appearance: 'textfield' }}
                                    color={
                                        errors.invitationCode?.message
                                            ? 'failure'
                                            : 'gray'
                                    }
                                    {...register('invitationCode')}
                                    disabled={
                                        isSubmitting ||
                                        typeof inviteCode !== 'undefined'
                                    }
                                />
                                {errors.invitationCode?.message && (
                                    <FieldErrorMessage>
                                        {errors.invitationCode?.message}
                                    </FieldErrorMessage>
                                )}
                            </div>
                            <div
                                className="flex max-w-md flex-col gap-4"
                                id="checkbox"
                            >
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        onClick={() => {
                                            onChanged()
                                        }}
                                        checked={checked}
                                        id="accept"
                                    />
                                    <Label className="flex" htmlFor="accept">
                                        <p
                                            className={
                                                'text-sm font-medium text-gray-500 dark:text-white'
                                            }
                                        >
                                            I agree with the
                                        </p>
                                        <Link
                                            className="text-cyan-600 hover:underline dark:text-cyan-500"
                                            href="/terms-and-conditions"
                                            target={'_blank'}
                                            rel={'noopener noreferrer'}
                                        >
                                            <p>&nbsp;terms and conditions</p>
                                        </Link>
                                    </Label>
                                </div>
                            </div>

                            <FormButton
                                label={'Sign up'}
                                isSubmitting={isSubmitting}
                                isDisabled={!checked}
                            />
                            {(errors.email?.message ||
                                errors.username?.message) && (
                                <div
                                    className={
                                        'flex flex-row text-center text-xl items-center text-red-600'
                                    }
                                >
                                    <p>Click&nbsp;</p>
                                    <Link
                                        className="text-cyan-600 hover:underline dark:text-cyan-500"
                                        href="/forgot"
                                    >
                                        <p>here </p>
                                    </Link>
                                    <p>&nbsp;to reset your password</p>
                                </div>
                            )}
                        </>
                    </form>
                </AuthenticationContainer>
            )}
        </>
    )
}

interface SuccessRegisterMessageProps {
    head: string
    email: string
    footer: string
}
function SuccessRegisterMessage({
    head,
    email,
    footer,
}: SuccessRegisterMessageProps) {
    return (
        <AuthenticationContainer title={head} backLink={'/login'}>
            <>
                <br />
                <p className="text-sm font-light text-black dark:text-gray-50">
                    An email has been sent to{' '}
                    <span className="text-sm font-normal text-cyan-600 underline dark:text-cyan-500">
                        {email}
                    </span>{' '}
                    .
                    <br />
                    Please click on the link to activate your account.
                    <br />
                    Didn&apos;t receive the email?
                    <br />
                    <ResendEmailVerificationButton email={email} />
                </p>
                <br />
                <p className="text-sm font-light text-black dark:text-gray-50">
                    {footer}
                </p>
            </>
        </AuthenticationContainer>
    )
}

export const ResendEmailVerificationButton = ({
    email,
}: ResendEmailVerificationRequestProps) => {
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const request: ResendEmailVerificationRequestProps = { email: email }

    const mutation = useMutation(resendEmailVerification, {
        onSuccess: (data) => {
            setLoading(false)
            setSuccess(true)
            console.log('result', data)
        },
        onMutate: () => {
            setLoading(true)
        },
    })

    return (
        <>
            {success ? (
                <p className="text-sm font-light text-black dark:text-gray-50">
                    Email has been sent!
                </p>
            ) : (
                <Tooltip
                    content={'Resend Email Verification'}
                    style={'auto'}
                    placement={'top'}
                >
                    <button
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        type={'button'}
                        onClick={() => {
                            setLoading(true)
                            setTimeout(() => {
                                mutation.mutate(request)
                            }, 2000)
                        }}
                        disabled={loading}
                        aria-label="Resend Email Verification"
                    >
                        {loading ? (
                            <LoadingIcons.SpinningCircles
                                style={{ width: '1.5rem', height: '1.5rem' }}
                            />
                        ) : (
                            <div className={'flex flex-row justify-center'}>
                                <p
                                    className={
                                        'text-sm font-light text-black dark:text-gray-50'
                                    }
                                >
                                    Click to verify &nbsp;
                                </p>
                                <RiMailSendLine className="w-5 h-5" />
                            </div>
                        )}
                    </button>
                </Tooltip>
            )}
        </>
    )
}
