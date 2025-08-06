'use client'
import React, { useEffect } from 'react'
import LogoSlide from './CompanySlide'
import JobCard from './JobTile'
import Filter from './Filter'
import PaginationComponent from './Pagination'
import { useGetAllJobsQuery } from '../redux/slices/featureapislice'
import JobCardSkeleton from './skeletons/JobCardSkeleton'
import { useSearchStore } from '@/zustand/store'




const JobLists = () => {
    const search = useSearchStore((state) => state.query);
    const { data: jobs, isLoading: jobLoading, error } = useGetAllJobsQuery({ search })

    if (error) {
        console.log('Error fetching jobs:', error)
    }



    console.log('Jobs fetched:', jobs)

    return (
        <div className='w-full relative   flex flex-col mt-7  items-center justify-center'>
            <div className='w-4/5  flex flex-col justify-center pb-6 text-white bg-[#1a1a1a] shadow-2xl rounded-2xl  items-center overflow-hidden '>
                <LogoSlide />
                <div className='flex w-full h-full justify-between items-start'>
                    <div className='flex w-full flex-1/4 py-4'>
                        <Filter />
                    </div>
                    <div className='flex flex-col w-full px-8 py-4 space-y-4'>
                        <div className=' font-bold flex justify-between  min-w-full'><div className='text-2xl'>Latest Jobs</div><div className=''>{jobs?.length} results</div></div>
                        <div className='min-h-screen flex flex-col '>
                            {jobLoading
                                ? Array(5)
                                    .fill(0)
                                    .map((_, index) => <JobCardSkeleton key={index} />)
                                : jobs && jobs.map((job: any) => (
                                    <JobCard
                                        data={job}
                                        key={job.id}

                                    />
                                ))}
                        </div>

                    </div>


                </div>
                <PaginationComponent />

            </div>
        </div>
    )
}

export default JobLists