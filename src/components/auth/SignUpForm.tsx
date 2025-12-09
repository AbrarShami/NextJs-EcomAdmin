"use client";
// import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";

import Link from "next/link";
import { useState, useActionState } from "react";
import { register } from "@/actions/auth";


export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5"><Link className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" href="landing-page"><ChevronLeftIcon />Back to Landing page</Link></div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <form action={action}>
              <div className="space-y-5">
                <div>
                  {/* <!-- First Name --> */}
                  <div>
                    <Label>
                      Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                    />
                    {state?.errors && 'name' in state.errors && state.errors.name && (
                      <p className="mt-2 text-sm text-error-500 ss">{state.errors.name}</p>
                    )}
                  </div>
                  {/* <!-- Last Name --> */}
                  {/* <div className="sm:col-span-1">
                    <Label>
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Enter your last name"
                    />
                  </div> */}
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  {state?.errors?.email && (
                    <p className="mt-2 text-sm text-error-500">{state.errors.email}</p>
                  )}
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                  {state?.errors && 'password' in state.errors && state?.errors?.password && (
                    <div className="mt-2 text-sm text-error-500">
                      <p>Password must:</p>
                      <ul className="list-disc list-inside ml-4">
                        {state.errors.password.map((err) => (
                          <li key={err}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* <!-- Confirm Password --> */}
                <div>
                  <Label>
                    Confirm Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Confirm your password"
                      name="confirmPassword"
                      type="password"
                    />
                    {/* <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span> */}
                  </div>
                  {state?.errors && 'confirmPassword' in state.errors && state?.errors?.confirmPassword && (
                    <p className="mt-2 text-sm text-error-500">{state.errors.confirmPassword}</p>
                  )}
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button disabled={isPending} className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    {isPending ? "Loading..." : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account? {''}
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
