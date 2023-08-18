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
        registerSchema,
        registerResponse,
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
                {isSubmitSuccessful && registerResponse ? (
                    <>
                        <p
                            className={
                                'text-xl font-bold text-gray-900 dark:text-gray-50'
                            }
                        >
                            {registerResponse.header}
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                        </p>
                        <br />
                        <p
                            className={
                                'text-md font-light text-gray-900 dark:text-gray-50'
                            }
                        >
                            {registerResponse.body}
                        </p>
                        <br />
                        <p
                            className={
                                'text-sm font-light text-gray-900 dark:text-gray-50'
                            }
                        >
                            {registerResponse.footer}
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
                                placeholder="username@company.com"
                                defaultValue="client@yopmail.com"
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
                                defaultValue="client"
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
                                defaultValue="Password123"
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
                                defaultValue="Password123"
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
                                defaultValue={123456}
                                placeholder=""
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                                autoComplete={'off'}
                                style={{ appearance: 'textfield' }}
                                color={
                                    errors.invitationCode?.message
                                        ? 'failure'
                                        : 'gray'
                                }
                                {...register('invitationCode')}
                                disabled={isSubmitting}
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
