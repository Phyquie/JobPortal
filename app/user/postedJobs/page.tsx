'use client'
import { useGetCompanyQuery } from "@/redux/slices/companySlice"
import { useGetAllJobsQuery } from "@/redux/slices/featureapislice"
import { useEffect, useState } from "react"
import JobCard from "@/component/JobTile"
import { useUser } from "@clerk/nextjs"
const Page = () => {
    const { user } = useUser();
    const { data: company } = useGetCompanyQuery({});
    const [selectedCompany, setSelectedCompany] = useState("");
    const { data: jobs, isLoading: jobLoading } = useGetAllJobsQuery({ companyId: selectedCompany, createdBy: user?.id });


    useEffect(() => {
        if (company && company.length > 0) {
            setSelectedCompany(company[0].id); // Set default to first company
        }

    }, [company]);

    const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCompany(e.target.value);
    };
    return (
        <div className="min-h-screen bg-black flex justify-center px-4 py-10">
            <div className='text-2xl flex rounded-xl w-full  max-w-4xl flex-col bg-[#1a1a1a] text-white px-8 py-10 shadow-lg space-y-4'>
                <div className='flex  font-bold'>
                    My Posted Jobs
                </div>
                <div className='text-sm text-gray-400'>Manage your posted jobs</div>
                <div className='flex flex-col text-sm'>
                    <select className='bg-[#2a2a2a] text-white p-3 rounded-md border-none mb-4' value={selectedCompany} onChange={handleCompanyChange}>
                        <option value="">Select Company</option>
                        {company?.map((comp: { id: string; name: string; description: string }) => (
                            <option key={comp.id} value={comp.id}>
                                {comp.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col justify-center items-center text-sm'>
                    {jobs && jobs.jobs.length > 0 ? (
                        jobs.jobs.map((job: { id: string }) => (
                            <JobCard
                                key={job.id}
                                data={job}
                            />
                        ))
                    ) : jobLoading ? (
                        // Array(5)
                        //     .fill(0)
                        //     .map((_, index) => <JobCardSkeleton key={index} />)
                        <div className="loader"></div>
                    )
                        : (
                            <div className='text-gray-500'>No jobs found for this company.</div>
                        )}
                </div>


            </div>
        </div>


    )
}

export default Page