import AuthenticationContainer from '@/components/login/AuthenticationContainer'
import { Checkbox, Label, TextInput } from 'flowbite-react'
import { MdEmail } from 'react-icons/md'
import React from 'react'
import { BsFillFilePersonFill } from 'react-icons/bs'
import { RiLockPasswordLine } from 'react-icons/ri'
import Link from 'next/link'
import { AiOutlineNumber } from 'react-icons/ai'
import useRegister from '@/components/login/useRegister'
import FormButton from '@/components/FormButton'

export default function RegisterWrapper() {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        isSubmitSuccessful,
        onSubmit,
        onChanged,
        checked,
    } = useRegister()
    return (
        <AuthenticationContainer
            title={'Create your account'}
            backLink={'/login'}
            backText={'Log in'}
        >
            <form
                className="space-y-2 md:space-y-2"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete={'off'}
            >
                {isSubmitSuccessful ? (
                    <>
                        <h5 className={'text-gray-700'}>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Success! We've sent an email with password reset
                            instructions to your inbox.
                        </h5>
                        <br />
                        <p>
                            Please check your email and follow the steps to
                            reset your password.
                        </p>
                    </>
                ) : (
                    <>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                            >
                                Your email
                            </label>
                            <TextInput
                                icon={MdEmail}
                                type="email"
                                id="email"
                                placeholder="name@company.com"
                                required
                                autoComplete={'new-email'}
                                className={
                                    'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                                }
                                color={
                                    errors.email?.message ? 'failure' : 'gray'
                                }
                                {...register('email')}
                                disabled={isSubmitting}
                            />
                            {errors.email?.message && (
                                <p className={'text-red-600'}>
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="icovest-name"
                                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                            >
                                Your name
                            </label>
                            <TextInput
                                icon={BsFillFilePersonFill}
                                type="text"
                                id="icovest-name"
                                placeholder="John Doe"
                                required
                                autoComplete={'new-name'}
                                className={
                                    'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                                }
                                color={
                                    errors.name?.message ? 'failure' : 'gray'
                                }
                                {...register('name')}
                                disabled={isSubmitting}
                            />
                            {errors.name?.message && (
                                <p className={'text-red-600'}>
                                    {errors.name?.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="icovest-password"
                                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                            >
                                Password
                            </label>
                            <TextInput
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
                                {...register('email')}
                                disabled={isSubmitting}
                            />
                            {errors.password?.message && (
                                <p className={'text-red-600'}>
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="verify-password"
                                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                            >
                                Confirm password
                            </label>
                            <TextInput
                                icon={RiLockPasswordLine}
                                type="password"
                                id="verify-password"
                                placeholder="Confirm your password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                                required
                                autoComplete={'new-password'}
                                color={
                                    errors.verifyPassword?.message
                                        ? 'failure'
                                        : 'gray'
                                }
                                {...register('verifyPassword')}
                                disabled={isSubmitting}
                            />
                            {errors.verifyPassword?.message && (
                                <p className={'text-red-600'}>
                                    {errors.verifyPassword?.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="invite-code"
                                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                            >
                                Invitation code
                            </label>
                            <TextInput
                                icon={AiOutlineNumber}
                                type="number"
                                id="invite-code"
                                placeholder="123456"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                                required
                                autoComplete={'off'}
                                style={{ appearance: 'textfield' }}
                                color={
                                    errors.inviteCode?.message
                                        ? 'failure'
                                        : 'gray'
                                }
                                {...register('inviteCode')}
                                disabled={isSubmitting}
                            />
                            {errors.inviteCode?.message && (
                                <p className={'text-red-600'}>
                                    {errors.inviteCode?.message}
                                </p>
                            )}
                        </div>
                        <div
                            className="flex max-w-md flex-col gap-4"
                            id="checkbox"
                        >
                            <div className="flex items-center gap-2">
                                <Checkbox onClick={onChanged} id="accept" />
                                <Label className="flex" htmlFor="agree">
                                    <p
                                        className={
                                            'text-sm font-medium text-gray-500 dark:text-white'
                                        }
                                    >
                                        I agree with the
                                    </p>
                                    <Link
                                        className="text-cyan-600 hover:underline dark:text-cyan-500"
                                        href="#"
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
                    </>
                )}
            </form>
        </AuthenticationContainer>
    )
}
