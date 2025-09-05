"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";


export default function CustomUserDropdown() {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const [currentView, setCurrentView] = useState<'main' | 'candidate' | 'company'>('main');
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent | TouchEvent) {
            if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
                setOpen(false);
                setCurrentView('main');
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
            <div className="flex  items-center cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
            <img
                src={user?.imageUrl}
                alt="User Avatar"
                className="h-7 w-7 rounded-full cursor-pointer"
                
            />
            <div><MdOutlineKeyboardDoubleArrowDown className="text-3xl" /></div>
            </div>

            {open && (
                <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-black p-2 shadow-lg overflow-hidden">
                    <div className="flex transition-transform duration-300 ease-in-out" style={{
                        transform: `translateX(${currentView === 'main' ? '0%' : currentView === 'candidate' ? '-115%' : '-225%'})`
                    }}>
                        {/* Main Menu */}
                        <div className="w-48 flex-shrink-0">
                            <p className="px-4 py-2 font-semibold text-sm">Hello, {user?.firstName}</p>
                            
                            <div
                                className="hover:bg-[#2f2b4e] px-4 py-2 text-sm cursor-pointer flex items-center justify-between"
                                onClick={() => setCurrentView('candidate')}
                            >
                                <span>Candidate Options</span>
                                <span>→</span>
                            </div>
                            
                            <div
                                className="hover:bg-[#2f2b4e] px-4 py-2 text-sm cursor-pointer flex items-center justify-between"
                                onClick={() => setCurrentView('company')}
                            >
                                <span>Company Options</span>
                                <span>→</span>
                            </div>
                            
                            <Link href={`/user/profile/${user?.id}`}>
                                <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm">Profile</p>
                            </Link>
                            
                            <SignOutButton>
                                <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm text-red-500">Sign Out</p>
                            </SignOutButton>
                        </div>

                        {/* Candidate Menu */}
                        <div className="w-48 flex-shrink-0">
                            <div
                                className="hover:bg-[#2f2b4e] px-4 py-2 text-sm cursor-pointer flex items-center"
                                onClick={() => setCurrentView('main')}
                            >
                                <span>← Back</span>
                            </div>
                            
                            <p className="px-4 py-2 font-semibold text-sm border-b border-gray-700">Candidate Options</p>
                            
                            <Link href="/user/appliedJobs">
                                <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm">My Applications</p>
                            </Link>
                            
                            <Link href="/user/savedJobs">
                                <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm">My Saved Jobs</p>
                            </Link>
                        </div>

                        {/* Company Menu */}
                        <div className="w-48 flex-shrink-0">
                            <div
                                className="hover:bg-[#2f2b4e] px-4 py-2 text-sm cursor-pointer flex items-center"
                                onClick={() => setCurrentView('main')}
                            >
                                <span>← Back</span>
                            </div>
                            
                            <p className="px-4 py-2 font-semibold text-sm border-b border-gray-700">Company Options</p>
                            
                            <Link href="/user/mycompanies">
                                <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm">My Companies</p>
                            </Link>
                            
                            <Link href="/user/postedJobs">
                                <p className="hover:bg-[#2f2b4e] px-4 py-2 text-sm">My Posted Jobs</p>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
