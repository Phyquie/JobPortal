'use client'
import React from 'react'
import { useGetJobApplicantsQuery } from '@/redux/slices/featureapislice'
import { use } from 'react';
import { useUpdateApplicantsStatusMutation } from '@/redux/slices/featureapislice';


const Page = ({ params }: { params: Promise<{ jobId: string }> }) => {
    const { jobId } = use(params)
    const { data: applicants, isLoading } = useGetJobApplicantsQuery(jobId);
    const [updateStatus] = useUpdateApplicantsStatusMutation();
    return (
        <div className="min-h-screen bg-black flex justify-center px-4 py-10">
            <div className='text-2xl flex rounded-xl w-full  max-w-4xl flex-col bg-[#1a1a1a] text-white px-8 py-10 shadow-lg space-y-4'>
                <div className='flex  font-bold'>
                    All Applicants
                </div>
                <div className='text-sm text-gray-400'>Manage your applicants</div>

                <div className='flex flex-col justify-center items-center text-sm'>
                    {/* Applicants list will be rendered here */}
                    {applicants && applicants.map((applicant: { id: string; user: { firstName: string; lastName: string; email: string }; resumeUrl: string; coverLetter: string; status: string }) => (
                        <div key={applicant.id} className='flex justify-between w-full items-center border-b border-gray-700 py-4'>
                            <div>
                                <div className='text-lg font-bold'>{`${applicant?.user.firstName} ${applicant?.user.lastName}`}</div>
                                <div className='text-sm text-gray-400'>{applicant?.user.email}</div>
                                <div>Resume : {applicant?.resumeUrl}</div>
                                <div>Cover Letter : {applicant?.coverLetter}</div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
                                {/* Add buttons for edit and delet gap-e functionality */}
                                {applicant.status === 'seen' ? <div className=' rounded-2xl bg-gray-700 px-3 py-2 cursor-pointer'>seen</div> :
                                    <button className='bg-green-700 rounded-2xl px-3 py-2 cursor-pointer' onClick={
                                        () => updateStatus({ id: applicant.id, status: 'seen' })
                                    }>Keep</button>}
                                {applicant.status === 'rejected' ? <div>Rejected</div> :
                                    <button className='bg-red-700 rounded-2xl px-3 py-2 cursor-pointer' onClick={
                                        () => updateStatus({ id: applicant.id, status: 'rejected' })
                                    }>Reject</button>}
                            </div>
                        </div>
                    ))}
                    {
                        isLoading && (
                            <div className='loader'></div>
                        )
                    }
                    {
                        applicants && applicants.length == 0 && !isLoading && (
                            <div>No applicants found.</div>
                        )
                    }

                </div>
            </div>
        </div>

    )
}

export default Page