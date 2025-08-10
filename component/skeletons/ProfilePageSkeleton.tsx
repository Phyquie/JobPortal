

import React from 'react'

const ProfilePageSkeleton = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-6">
            <div className="max-w-6xl w-full bg-[#1a1a1a] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-xl">

                {/* Left panel skeleton */}
                <div className="bg-gradient-to-br from-[#a989f6] via-[#9474d6] to-[#8370ee] text-white p-6 md:p-10 flex flex-col justify-center items-center animate-pulse">
                    <div className="flex flex-col items-center text-center space-y-4 w-full">
                        <div className="h-6 md:h-8 w-3/4 bg-white/30 rounded"></div>
                        <div className="h-4 md:h-5 w-2/3 bg-white/20 rounded"></div>
                    </div>

                    <div className="mt-6 md:mt-8 hidden md:block w-full space-y-2">
                        <div className="h-4 w-1/2 bg-white/20 rounded"></div>
                        <div className="h-3 w-3/4 bg-white/10 rounded"></div>
                        <div className="h-3 w-2/3 bg-white/10 rounded"></div>
                        <div className="h-3 w-1/2 bg-white/10 rounded"></div>
                    </div>
                </div>

                {/* Right panel skeleton */}
                <div className="p-6 md:p-10 text-white bg-[#121212] animate-pulse">
                    <div className="h-6 md:h-7 w-1/3 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-600 rounded mb-6"></div>

                    {/* Form fields skeleton */}
                    <div className="space-y-4 text-sm">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 h-10 bg-gray-700 rounded"></div>
                            <div className="flex-1 h-10 bg-gray-700 rounded"></div>
                        </div>

                        <div className="h-10 bg-gray-700 rounded"></div>

                        <div className="h-10 bg-gray-700 rounded"></div>

                        <div className="h-10 bg-gray-700 rounded"></div>

                        <div className="h-10 bg-gray-700 rounded mt-4"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProfilePageSkeleton

