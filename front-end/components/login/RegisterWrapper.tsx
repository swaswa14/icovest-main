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
import FieldErrorMessage from '@/components/FieldErrorMessage'

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
                                htmlFor="register-email"
                                className="text-sm font-medium text-gray-500 dark:text-white"
                            >
                                Email
                            </label>
                            <TextInput
                                icon={MdEmail}
                                type="email"
                                id="register-email"
                                placeholder="name@company.com"
                                required
                                sizing={'sm'}
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
                                <FieldErrorMessage>
                                    {errors.email?.message}
                                </FieldErrorMessage>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="icovest-name"
                                className="text-sm font-medium text-gray-500 dark:text-white"
                            >
                                Username
                            </label>
                            <TextInput
                                icon={BsFillFilePersonFill}
                                type="text"
                                id="icovest-name"
                                placeholder="john.doe"
                                sizing={'sm'}
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
                                <FieldErrorMessage>
                                    {errors.name?.message}
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
                                placeholder="123456"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
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
                                <FieldErrorMessage>
                                    {errors.inviteCode?.message}
                                </FieldErrorMessage>
                            )}
                        </div>
                        <div
                            className="flex max-w-md flex-col gap-4"
                            id="checkbox"
                        >
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    onClick={(e) => {
                                        onChanged()
                                    }}
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
