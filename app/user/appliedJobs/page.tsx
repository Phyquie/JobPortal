'use client';
import React from 'react';
import { useGetApplicationsByUserIdQuery } from '@/redux/slices/userSlice';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Page = () => {
    const { user } = useUser();
    const { data: applications, isLoading, error } = useGetApplicationsByUserIdQuery(user?.id || '');
    console.log("Applications:", applications);
    return (
        <div className='min-h-screen w-full flex justify-center   bg-black'>
            <div className='text-2xl flex rounded-xl w-full  max-w-4xl flex-col bg-[#1a1a1a] text-white px-8 py-10 shadow-lg space-y-4'>
                <h1>Applied Jobs</h1>
                <div className='flex flex-col space-y-2 w-full justify-center items-center'>
                    {isLoading ? (
                        <div className=' loader'></div>
                    ) : error ? (
                        <div className='text-gray-500 text-sm'>No applications found</div>
                    ) : applications && applications.length > 0 ? (
                        applications.map((application) => (
                            <>
                                <Link key={application.id} href={`/viewJob/${application.jobId}`} className='bg-[#292929 w-full p-4 rounded-lg hover:bg-[#3a3a3a] transition-colors flex justify-between'>
                                    <div>
                                        <h3 className='text-sm font-medium'>{application.job.company.name}</h3>
                                        <h2 className='text-lg font-semibold'>{application.job.title}</h2>
                                        <p className='text-gray-400 text-sm'>Applied on: {new Date(application.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className='text-sm text-gray-500'>Status: {application.status}</div>
                                </Link>
                                <div className='w-full border-b border-gray-600 my-2'></div>
                            </>
                        ))
                    ) : (
                        <div className='text-gray-500'>No applications found</div>
                    )}

                </div>
            </div>
        </div >
    )
}

export default Page