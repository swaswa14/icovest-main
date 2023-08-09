import AuthenticationContainer from '@/components/login/AuthenticationContainer'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { MdEmail } from 'react-icons/md'
import React from 'react'
import { BsFillFilePersonFill } from 'react-icons/bs'
import { RiLockPasswordLine } from 'react-icons/ri'
import Link from 'next/link'
import { AiOutlineNumber } from 'react-icons/ai'

export default function RegisterWrapper() {
    return (
        <AuthenticationContainer
            title={'Create your account'}
            backLink={'/login'}
            backText={'Log in'}
        >
            <form className="space-y-2 md:space-y-2" action="#">
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
                        name="email"
                        id="email"
                        placeholder="name@company.com"
                        required
                        className={
                            'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                    >
                        Your name
                    </label>
                    <TextInput
                        icon={BsFillFilePersonFill}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="John Doe"
                        required
                        className={
                            'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg'
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                    >
                        Password
                    </label>
                    <TextInput
                        icon={RiLockPasswordLine}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="verify-password"
                        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                    >
                        Verify password
                    </label>
                    <TextInput
                        icon={RiLockPasswordLine}
                        type="password"
                        name="password"
                        id="verify-password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                        required
                    />
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
                        name="invite-code"
                        id="invite-code"
                        placeholder="123456"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                        required
                        style={{ appearance: 'textfield' }}
                    />
                </div>
                <div className="flex max-w-md flex-col gap-4" id="checkbox">
                    <div className="flex items-center gap-2">
                        <Checkbox defaultChecked id="accept" />
                        <Label className="flex" htmlFor="agree">
                            <p>I agree with the</p>
                            <Link
                                className="text-cyan-600 hover:underline dark:text-cyan-500"
                                href="/forms"
                            >
                                <p>&nbsp;terms and conditions</p>
                            </Link>
                        </Label>
                    </div>
                </div>

                <Button className="w-full">Sign up</Button>
            </form>
        </AuthenticationContainer>
    )
}
