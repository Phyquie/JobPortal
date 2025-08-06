"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function CustomUserDropdown() {
    const { user } = useUser();

    return (
        <div className="relative group">
            <img
                src={user?.imageUrl}
                alt="User Avatar"
                className="h-7 w-7 rounded-full"

            />
            <div className="absolute right-0 z-10 mt-2 hidden w-48 rounded-md bg-black p-2 shadow-lg group-hover:block ">
                <p className="px-4 py-2 font-semibold text-sm">Hello, {user?.firstName}</p>
                <Link href="/user/appliedJobs">
                    <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm">My Applications</p>
                </Link>
                <Link href="/user/postedJobs">
                    <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm">My Posted Jobs</p>
                </Link>
                <Link href="/user/mycompanies">
                    <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm">My Companies</p>
                </Link>
                <Link href="/user/profile">
                    <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm">Profile</p>
                </Link>
                <SignOutButton>
                    <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm text-red-500">Sign Out</p>
                </SignOutButton>
            </div>
        </div>
    );
}
