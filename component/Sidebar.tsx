"use client";

import Link from "next/link";
import { useUser, SignOutButton, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Sidebar({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { user } = useUser();
    const router = useRouter();
    const clerk = useClerk();
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Close sidebar on route change
    useEffect(() => {
        const handleRouteChange = () => {
            onClose();
        };

        window.addEventListener("popstate", handleRouteChange);

        const originalPush = router.push;
        router.push = async (...args) => {
            onClose();
            return originalPush(...args);
        };

        return () => {
            window.removeEventListener("popstate", handleRouteChange);
            router.push = originalPush;
        };
    }, [onClose, router]);

    // Close sidebar on sign out
    useEffect(() => {
        const unsubscribe = clerk.addListener((event: any) => {
            if (event.event === "signedOut") {
                onClose();
            }
        });

        return () => unsubscribe();
    }, [clerk, onClose]);

    // Close sidebar on clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node) &&
                isOpen
            ) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div
            ref={sidebarRef}
            className={`fixed top-14 right-0 h-[calc(100vh-50px)] w-52 bg-[#1a1a1a] shadow-lg transform transition-transform duration-300 z-50 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            {/* Links */}
            <nav className="p-4 space-y-3 text-sm font-semibold">
                <Link
                    href="/user/appliedJobs"
                    className="block text-white hover:text-blue-600"
                    onClick={onClose}
                >
                    My Application
                </Link>
                <Link
                    href="/user/postedJobs"
                    className="block text-white hover:text-blue-600"
                    onClick={onClose}
                >
                    My Posted Jobs
                </Link>
                <Link
                    href="/user/mycompanies"
                    className="block text-white hover:text-blue-600"
                    onClick={onClose}
                >
                    My Companies
                </Link>
                <Link
                    href="/user/savedJobs"
                    className="block text-white hover:text-blue-600"
                    onClick={onClose}
                >
                    Saved Jobs
                </Link>
                <Link
                    href={`/user/profile/${user?.id}`}
                    className="block text-white hover:text-blue-600"
                    onClick={onClose}
                >
                    Profile
                </Link>
                <SignOutButton>
                    <div className="block text-red-500 hover:text-blue-600">Sign Out</div>
                </SignOutButton>
            </nav>
        </div>
    );
}
