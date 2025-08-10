'use client';

import React from 'react';
import {
    SignInButton,
} from '@clerk/nextjs'
import CustomUserDropdown from './CustomUserDropDown';
import { useUser } from "@clerk/clerk-react";
import Link from 'next/link';
import { FiMenu } from "react-icons/fi";


export default function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
    const { isSignedIn, user, isLoaded } = useUser();

    return (

        <div className="flex w-full py-3 justify-between px-4 shadow-2xl bg-[#2f2b4e] text-white sticky top-0 z-50">
            <div className="flex items-center space-x-4">

                <Link href="/" className="flex items-center space-x-2">
                    <div className='text-sm md:text-2xl font-extrabold'>Rojgaar</div>
                </Link>
            </div>

            <div className='flex-1 md:flex justify-center items-center hidden space-x-4 font-bold'>
                <div>Home</div>
                <div>About</div>
                <div>Contact</div>
                <div>Subscribe</div>
            </div>

            <div className='flex'>
                {isSignedIn && isLoaded ? (
                    <div className="flex items-center space-x-4 mr-4">
                        <div className="text-sm md:text-lg font-bold">{user.firstName} {user.lastName}</div>
                        <CustomUserDropdown />

                        <img
                            src={user?.imageUrl}
                            alt="User Avatar"
                            className="h-7 w-7 rounded-full  cursor-pointer md:hidden"
                        />
                        <button onClick={onToggleSidebar} className='md:hidden'><FiMenu /></button>

                    </div>
                ) : (
                    <SignInButton>
                        <div className="bg-[#a989f6] flex rounded-2xl justify-center font-bold px-3 items-center w-28 mr-4">
                            Sign in
                        </div>
                    </SignInButton>
                )}


            </div>
        </div >


    );
}
