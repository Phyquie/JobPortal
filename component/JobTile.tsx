import React from 'react'
import instagram from "../public/comapnylogos/instagram_glyph_gradient-logo_brandlogos.net_52bks.png"
import Link from 'next/link'
import { useDeleteJobByIdMutation } from '@/redux/slices/featureapislice'
import { useUser } from '@clerk/nextjs'


const JobCard = ({ data }: { data: any }) => {
    const { user } = useUser();
    const userId = user?.id;
    const [deleteJob, { isLoading: isDeleting }] = useDeleteJobByIdMutation();

    const handleDelete = async () => {
        if (user) {
            await deleteJob(data.id);
        }
    };

    return (
        <div className='w-full border flex py-2   border-white  text-white rounded-2xl'>
            <div className='flex flex-col w-full'>
                <div className='flex'>
                    <div className=' flex items-center flex-col justify-center min-w-max p-4'>
                        <img src={data?.companyLogo} alt="Company Logo" className='w-10 h-10 object-fill' />
                    </div>
                    <div className='flex flex-col  brightness-90 '>
                        <div className='text-md font-bold mb-2'>{data?.company?.name}</div>
                        <div className='text-xl font-bold mb-3' >{data?.title}</div>
                        <div className='flex gap-2 mb-3'>
                            <div className='bg-gray-600 text-white px-2 rounded-2xl'>{data?.skills}</div>
                            <div className='bg-gray-600 text-white px-2 rounded-2xl'>{data?.type}</div>
                        </div>

                    </div>
                </div>
                <div className='text-sm mb-2 pl-4'>{data?.description && data.description.length > 250 ? data.description.substring(0, 250) + '...' : data?.description}</div>
            </div>
            <div className='flex min-w-max flex-col justify-center px-5'>
                {userId === data?.createdBy ? (
                    <Link
                        className='bg-[#a989f6] text-white rounded-md py-2 px-4 font-bold mt-2'
                        href={`/user/postedJobs/applicants/${data?.id}`}
                    >
                        View Applicants
                    </Link>) :
                    <Link href={`/viewJob/${data?.id}`} className='bg-[#a989f6] text-white rounded-md py-2 px-4 font-bold'
                    >View Job</Link>
                }

                {userId === data?.createdBy && (
                    <button
                        className='bg-gray-700 text-white rounded-md py-2 px-4 font-bold mt-2'
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        Delete Job
                    </button>
                )}
            </div>
        </div>
    )
}

export default JobCard