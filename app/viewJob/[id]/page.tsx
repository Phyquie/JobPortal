"use client";

import { useParams } from "next/navigation";
import { ApplyButton } from "@/component/ApplyButton";
import { useGetJobByIdQuery } from "@/redux/slices/featureapislice";
import JobDetailSkeleton from "@/component/skeletons/JobDetailSkeleton";
import { useGetApplicationsByUserIdQuery } from "@/redux/slices/userSlice";
import { useUser } from "@clerk/nextjs";
import { useCreateClerkMutation } from '@/redux/slices/clerkSlice';
import { useEffect } from "react";







export default function JobDetailPage() {
    const { id } = useParams();
    const { user } = useUser();
    const { data: Job, isLoading: loading, error } = useGetJobByIdQuery(id as string, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });
    console.log(Job)
    const { data: applications, isLoading: loadingApps, error: appsError } = useGetApplicationsByUserIdQuery(user?.id || '');

    const isApplied = applications?.some(app => app.jobId === id);
    const [createClerk] = useCreateClerkMutation();
    useEffect(() => {
        if (user) {
            createClerk(user);
        }
    }, [user, createClerk]);

    if (loading) return <JobDetailSkeleton />;
    if (error) return <div className="text-red-500 p-10">Error fetching job details</div>;
    if (!Job) return <div className="text-red-500 p-10">Job not found</div>;

    return (
        <div className="min-h-screen bg-black px-4 py-10 text-white flex justify-center">
            <div className="bg-[#1a1a1a] w-full max-w-4xl rounded-2xl shadow-lg px-8 py-10">
                {/* Title & Header */}
                <div className="mb-4">
                    <h1 className="text-3xl font-bold">{Job?.title}</h1>
                    <div className="text-gray-400 text-sm mt-1">
                        Posted on {new Date(Job?.createdAt).toLocaleDateString()}
                    </div>
                </div>

                {/* Company / Location / Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="text-[#a989f6] font-semibold">{Job?.company}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-300">{Job?.location}, {Job?.pin}</span>
                </div>

                <div className="flex flex-wrap gap-3 mb-8">
                    <span className="bg-[#292929] px-3 py-1 text-sm rounded-md text-gray-200">{Job?.type.replace("_", " ")}</span>
                    <span className="bg-[#292929] px-3 py-1 text-sm rounded-md text-gray-200">₹{Job?.salary?.toLocaleString()}</span>
                    <span className="bg-[#292929] px-3 py-1 text-sm rounded-md text-gray-200">{Job?.category}</span>
                </div>

                {/* Sections */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Job Description</h2>
                    <p className="text-gray-300 whitespace-pre-wrap">{Job?.description}</p>
                </div>

                {Job?.skills && (
                    <div className="mb-6">
                        <h2 className="font-semibold text-lg mb-2">Skills Required</h2>
                        <p className="text-gray-300">{Job?.skills}</p>
                    </div>
                )}

                {/* Attachments */}
                {Job?.jobDocUrl && (
                    <div className="mb-6">
                        <h2 className="font-semibold text-lg mb-2">Attachment</h2>
                        <a
                            href={Job?.jobDocUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-[#2a2a2a] hover:bg-[#333] transition p-4 rounded-md text-[#a989f6] font-medium underline"
                        >
                            View Job Description PDF
                        </a>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                    {isApplied?<div  className=" h-full font-semibold px-6 py-2 rounded-md border-[#444] border  text-gray-300 ">Already Applied</div>:<ApplyButton JobId={Job.id} />}
                    <button className="border border-[#444] hover:border-[#66] text-gray-300 px-6 py-2 rounded-md">
                        Save Job
                    </button>
                </div>
            </div>
        </div>
    );
}
