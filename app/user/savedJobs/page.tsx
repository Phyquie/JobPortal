'use client'
import { useGetSavedJobsQuery } from "@/redux/slices/userSlice"
import JobCard from "@/component/JobTile"


const SavedJobpage = () => {

    const { data: savedJobs, isLoading: savedJobsLoading } = useGetSavedJobsQuery({});

    console.log(savedJobs);
    return (
        <div className='min-h-screen w-full flex justify-center  bg-black'>
            <div className="text-2xl min-h-screen flex rounded-xl w-full  max-w-4xl flex-col bg-[#1a1a1a] text-white px-8 py-10 shadow-lg space-y-4">
                <div className='text-xl md:text-2xl text-white font-bold '>Saved Jobs</div>
                <div className="bg-[#1a1a1a] mt-5 md:mt-10">
                    {savedJobsLoading && <div className="loading"></div>}
                    {savedJobs && savedJobs.map(job => (
                        <JobCard key={job.id} data={job.job} />
                    ))}
                    {savedJobs && savedJobs.length === 0 && !savedJobsLoading && (
                        <div className='text-gray-500 text-center mt-10 text-base'>No saved jobs found.</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SavedJobpage;