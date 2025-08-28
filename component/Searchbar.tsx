'use client'

import React from 'react';
import AnimatedTitle from './HeadingText/HeadingText';
import { useSearchStore } from '@/zustand/store'
import { useState } from 'react';

export default function Searchbar() {
    const [localQuery, setLocalQuery] = useState('');
    const setQuery = useSearchStore((state) => state.setQuery);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalQuery(value);
        setQuery(value); // triggers debounced update
    };

    return (
        <div className="flex w-full py-3 px-4 mt-5 justify-center   text-white">
            <div className='w-full flex justify-center flex-col items-center space-x-4 font-bold'>
                <AnimatedTitle />
                <div className='text-center text-sm md:text-md mt-5'>Are you looking for perfect job or ideal candidate? Find your dream job with thousands of job posting across industries</div>
                <div className='flex w-full mt-4 text-sm md:text-xl bg-[#1a1a1a] p-2 rounded-lg items-center'>
                    <input type="text" placeholder="Search for jobs, companies, or skills" className="w-full p-2 rounded-lg" value={localQuery} onChange={handleChange} />
                    {/* <button className="bg-[#a989f6] hidden sm:block text-white text-sm md:text-base px-4 py-2 rounded-lg ml-2">Search</button> */}
                </div>
            </div>
        </div>
    );
}   