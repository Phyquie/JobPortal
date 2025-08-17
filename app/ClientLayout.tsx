"use client";

import { useState } from "react";
import Header from "@/component/Header";
import Sidebar from "@/component/Sidebar";
import ClientProviders from "./clientProvider";
import { Toaster } from 'react-hot-toast'


export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <ClientProviders>
            <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <main className="relative overflow-y-auto">
                {children}
            </main>
            <Toaster />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </ClientProviders>
    );
}
