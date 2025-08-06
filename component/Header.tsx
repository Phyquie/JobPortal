'use client';

import React from 'react';
import {
    SignInButton,
    UserButton
} from '@clerk/nextjs'
import CustomUserDropdown from './CustomUserDropDown';
import { useUser } from "@clerk/clerk-react";
import Link from 'next/link';



export default function Home() {
    const { isSignedIn, user, isLoaded } = useUser();
    console.log("User:", user?.id);
    return (
        <div className="flex w-full py-3 justify-between px-4 shadow-2xl bg-[#2f2b4e] text-white sticky top-0 z-50 ">
            <Link href="/" className="flex items-center space-x-2">
                <div className='text-2xl font-extrabold w-56'>Rojgaar</div>
            </Link>
            <div className='flex-1 flex justify-center items-center space-x-4 font-bold'>
                <div>Home</div>
                <div>About</div>
                <div>Contact</div>
                <div>Subscribe</div>
            </div>
            <div className='flex '>
                {isSignedIn && isLoaded ? (
                    <div className="flex items-center space-x-4 mr-4">
                        <div className="text-lg font-bold">{user.firstName} {user.lastName}</div>

                        <CustomUserDropdown />
                    </div>
                ) : (
                    <SignInButton>
                        <div className="bg-[#a989f6] flex rounded-2xl justify-center font-bold px-3  items-center w-28 mr-4">Sign in</div>
                    </SignInButton>
                )}

                <Link href="/createJob" className='flex'>
                    <div className="bg-[#a989f6] flex rounded-2xl font-bold px-3 py-1  items-center w-28">Post a Job</div>
                </Link>
            </div>

        </div>
    );
}