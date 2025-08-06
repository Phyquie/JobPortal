import React from "react";

export default function JobDetailSkeleton() {
    return (
        <div className="min-h-screen bg-black px-4 py-10 flex justify-center">
            <div className="bg-[#1a1a1a] w-full max-w-4xl rounded-2xl shadow-lg px-8 py-10 space-y-6 text-white">

                {/* Title & Date */}
                <div>
                    <div className="h-8 w-2/3 bg-[#292929] rounded mb-2"></div>
                    <div className="h-4 w-1/4 bg-[#292929] rounded"></div>
                </div>

                {/* Company / Location */}
                <div className="flex flex-wrap gap-2">
                    <div className="h-5 w-24 bg-[#292929] rounded"></div>
                    <div className="h-5 w-2 bg-[#292929] rounded"></div>
                    <div className="h-5 w-32 bg-[#292929] rounded"></div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                    <div className="h-6 w-20 bg-[#292929] rounded-md"></div>
                    <div className="h-6 w-24 bg-[#292929] rounded-md"></div>
                    <div className="h-6 w-20 bg-[#292929] rounded-md"></div>
                </div>

                {/* Description */}
                <div>
                    <div className="h-6 w-1/3 bg-[#292929] rounded mb-2"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-[#292929] rounded"></div>
                        <div className="h-4 w-11/12 bg-[#292929] rounded"></div>
                        <div className="h-4 w-10/12 bg-[#292929] rounded"></div>
                        <div className="h-4 w-2/3 bg-[#292929] rounded"></div>
                    </div>
                </div>

                {/* Skills */}
                <div>
                    <div className="h-5 w-1/4 bg-[#292929] rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-[#292929] rounded"></div>
                </div>

                {/* Attachment */}
                <div>
                    <div className="h-5 w-1/4 bg-[#292929] rounded mb-2"></div>
                    <div className="h-10 w-full bg-[#292929] rounded"></div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <div className="h-10 w-32 bg-[#292929] rounded-md"></div>
                    <div className="h-10 w-32 bg-[#292929] rounded-md"></div>
                </div>
            </div>
        </div>
    );
}
