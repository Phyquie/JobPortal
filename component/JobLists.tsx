'use client'
import React, { useState } from 'react'
import LogoSlide from './CompanySlide'
import JobCard from './JobTile'
import Filter from './Filter'
import PaginationComponent from './Pagination'
import { useGetAllJobsQuery } from '../redux/slices/featureapislice'
import JobCardSkeleton from './skeletons/JobCardSkeleton'
import { useSearchStore } from '@/zustand/store'




const JobLists = () => {
    const search = useSearchStore((state) => state.query);
    const [page, setPage] = useState(1);
    const limit = 10;
    const [type, setType] = useState('');
    const [categories, setCategories] = useState('');
    const [maxSalary, setMaxSalary] = useState(NaN);
    const minSalary = 0;
    const { data, isLoading: jobLoading, error } = useGetAllJobsQuery({ search, page, limit, type, categories , maxSalary ,minSalary });

    if (error) {
        console.log('Error fetching jobs:', error)
    }




    return (
        <div className='w-full relative   flex flex-col mt-7  items-center justify-center'>
            <div className='w-full  flex flex-col justify-center pb-6 text-white bg-[#1a1a1a] shadow-2xl rounded-2xl  items-center overflow-hidden '>
                <LogoSlide />
                <div className='flex w-full h-full justify-between items-start'>
                    <div className='md:flex w-full flex-1/4 py-4 hidden'>
                        <Filter onTypeChange={setType} onCategoryChange={setCategories} onSalaryChange={setMaxSalary} />
                    </div>
                    <div className='flex flex-col w-full px-8 py-4 space-y-4'>
                        <div className=' font-bold flex justify-between  min-w-full'><div className='text-xl md:text-2xl'>Latest Jobs</div>{data?.totalCount && <div className=''>{data?.totalCount} results</div>}</div>
                        <div className='min-h-screen flex flex-col gap-2'>
                            {jobLoading
                                ? Array(5)
                                    .fill(0)
                                    .map((_, index) => <JobCardSkeleton key={index} />)
                                : data?.jobs && data.jobs.map((job: any) => (
                                    <JobCard
                                        data={job}
                                        key={job.id}
                                    />
                                ))}
                            {
                                data?.jobs && data.jobs.length === 0 && !jobLoading && (
                                    <div className='text-center text-gray-500'>No jobs found</div>
                                )
                            }
                        </div>

                    </div>
                </div>
                <PaginationComponent
                    currentPage={page}
                    totalCount={data?.totalCount ?? 0}
                    limit={limit}
                    onPageChange={setPage}
                />

            </div>
        </div>
    )
}

export default JobLists