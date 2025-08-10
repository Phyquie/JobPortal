"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CustomUserDropdown() {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent | TouchEvent) {
            if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative hidden md:block" ref={dropdownRef}>
            <img
                src={user?.imageUrl}
                alt="User Avatar"
                className="h-7 w-7 rounded-full  cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
            />

            {open && (
                <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-black p-2 shadow-lg">
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
                    <Link href={`/user/profile/${user?.id}`}>
                        <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm">Profile</p>
                    </Link>
                    <SignOutButton>
                        <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm text-red-500">Sign Out</p>
                    </SignOutButton>
                </div>
            )}
        </div>
    );
}
