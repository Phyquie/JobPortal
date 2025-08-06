import React from 'react'

const JobCardSkeleton = () => {
    return (
        <div className='min-w-[864px] min-h-[194px] border flex py-2 border-white text-white rounded-2xl animate-pulse'>
            <div className='flex flex-col w-full'>
                <div className='flex px-4'>
                    {/* Left Icon */}
                    <div className='flex items-center justify-center min-w-max p-4'>
                        <div className='w-10 h-10 bg-gray-700 '></div>
                    </div>

                    {/* Title and Tags */}
                    <div className='flex flex-col w-full space-y-2'>
                        <div className='h-4 w-32 bg-gray-700 rounded'></div>
                        <div className='h-6 w-48 bg-gray-700 rounded'></div>
                        <div className='flex gap-2'>
                            <div className='h-5 w-20 bg-gray-700 rounded-2xl'></div>
                            <div className='h-5 w-16 bg-gray-700 rounded-2xl'></div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className='pl-20 mt-3 pr-4 '>
                    <div className='h-4 w-full bg-gray-700 rounded mb-1'></div>
                    <div className='h-4 w-full bg-gray-700 rounded mb-1'></div>
                    <div className='h-4 w-full bg-gray-700 rounded'></div>
                </div>
            </div>

            {/* Right Button */}
            <div className='flex min-w-[100px] flex-col justify-center px-5'>
                <div className='h-10 w-24 bg-gray-700 rounded-md'></div>
            </div>
        </div>
    )
}

export default JobCardSkeleton
