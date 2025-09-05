import React from 'react'
import instagram from "../public/comapnylogos/instagram_glyph_gradient-logo_brandlogos.net_52bks.png"
import Link from 'next/link'
import { useDeleteJobByIdMutation } from '@/redux/slices/featureapislice'
import { useUser } from '@clerk/nextjs'
import { FaBookmark } from "react-icons/fa6";
import { useAddSavedJobMutation, useGetSavedJobsQuery, useDeleteSavedJobsMutation } from '@/redux/slices/userSlice'
import toast from 'react-hot-toast'






const JobCard = ({ data }: { data: any }) => {
    const { user } = useUser();
    const userId = user?.id;
    const [deleteJob, { isLoading: isDeleting }] = useDeleteJobByIdMutation();
    const [addSavedJob] = useAddSavedJobMutation();
    const [deleteSavedJob] = useDeleteSavedJobsMutation();
    const { data: savedJobs } = useGetSavedJobsQuery({});

    const isJobSaved = Array.isArray(savedJobs) && savedJobs.some((savedJob: { job: { id: string } }) => savedJob.job.id === data.id);

  const rupeeFn = (value: number): string => {
  if (value >= 10000000) {
    // 1 Cr and above
    return (value / 10000000).toFixed(2).replace(/\.00$/, "") + " Cr";
  } else if (value >= 100000) {
    // 1 Lakh and above
    return (value / 100000).toFixed(2).replace(/\.00$/, "") + " Lakh";
  } else if (value >= 1000) {
    // 1 Thousand and above
    return (value / 1000).toFixed(2).replace(/\.00$/, "") + " K";
  } else {
    // less than 1000 → normal number
    return value.toString();
  }
};

    const type = {
        full_time: "Full Time",
        part_time: "Part Time",
        internship: "Internship",
        contract: "Contract"
    }

    const handleDelete = async () => {
        if (user) {
            const res = await deleteJob(data.id);
            if (res) {
                toast.success("Job deleted successfully");
            } else {
                toast.error("Failed to delete job");
            }
        }
    };

    const handleSavedJobs = async () => {
        if (user) {
            if (isJobSaved) {
                const res = await deleteSavedJob(data.id);
                toast.success("Job removed from saved jobs");
            } else {
                await addSavedJob(data.id);
                toast.success("Job saved successfully");
            }
        } else {
            toast.error("Please sign in to save jobs");
        }
    };

    return (
        <div className='w-full border flex py-2 overflow-hidden   border-white  text-white rounded-2xl'>
            <div className='flex flex-col w-full'>
                <div className='flex'>
                    <div className=' flex items-center flex-col justify-center min-w-max p-4'>
                        <img src={data?.company?.logoUrl} alt="Company Logo" className='w-10 h-10 object-fill' />
                    </div>
                    <div className='flex flex-col  brightness-90 '>
                        <div className='text-sm md:text-md font-bold mb-2'>{data?.company?.name}</div>
                        <div className='text-md md:text-xl font-bold mb-3' >{data?.title}</div>
                        <div className='flex flex-col md:flex-row gap-2 mb-3'>
                            <div className='bg-gray-600 text-white px-2 text-sm md:text-base rounded-2xl font-semibold'>{data?.skills}</div>
                            <div className='bg-gray-600 text-white px-2 text-sm md:text-base rounded-2xl font-semibold'>{type[data?.type as keyof typeof type]}</div>
                            <div className='bg-gray-600 text-white px-2 text-sm md:text-base rounded-2xl font-semibold'>₹{rupeeFn(data?.salary)} Per Annum</div>
                        </div>

                    </div>
                </div>
                <div className='text-sm hidden md:block mb-2 pl-4'>{data?.description && data.description.length > 250 ? data.description.substring(0, 250) + '...' : data?.description}</div>
                <div className='text-sm md:hidden mb-2 pl-4'>{data?.description && data.description.length > 50 ? data.description.substring(0, 50) + '...' : data?.description}</div>
            </div>
            <div className='flex min-w-max flex-col relative justify-center px-5'>
                {userId === data?.createdBy ? (
                    <Link
                        className='bg-[#a989f6] text-white text rounded-md text-[10px] md:text-base py-2 px-4 font-bold mt-2'
                        href={`/user/postedJobs/applicants/${data?.id}`}
                    >
                        View Applicants
                    </Link>) :
                    <Link href={`/viewJob/${data?.id}`} className='bg-[#a989f6] text-[14px] md:text-base text-white rounded-md py-2 px-4 font-bold'
                    >View Job</Link>
                }

                {userId === data?.createdBy && (
                    <button
                        className='bg-gray-700 text-white rounded-md text-[10px] md:text-base py-2 px-4 font-bold mt-2'
                        onClick={handleDelete}

                    >
                        {isDeleting ? "Deleting..." : "Delete Job"}
                    </button>
                )}
                <div className='absolute top-2 right-2 text-xl' onClick={handleSavedJobs}>
                    <FaBookmark className={isJobSaved ? " text-[#a989f6]" : ""} />
                </div>
            </div>
        </div>
    )
}

export default JobCard