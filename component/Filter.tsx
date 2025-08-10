import React, { useState } from 'react';

type FilterProps = {
    onTypeChange: (type: string) => void;
};

const Filter = ({ onTypeChange }: FilterProps) => {
    const [selectedType, setSelectedType] = useState<string>("");

    const handleTypeChange = (value: string) => {
        const newValue = selectedType === value ? "" : value; // toggle behavior
        setSelectedType(newValue);
        onTypeChange(newValue);
    };

    const jobTypes = [
        { label: "Full Time", value: "full_time" },
        { label: "Part Time", value: "part_time" },
        { label: "Contract", value: "contract" },
        { label: "Internship", value: "internship" },
    ];

    return (
        <div className="min-h-max flex-col px-8 border-r border-white">
            <div className="text-2xl font-bold text-white whitespace-nowrap mb-6">
                Job Type
            </div>
            <div className="flex flex-col text-white">
                {jobTypes.map((job) => (
                    <label key={job.value} className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedType === job.value}
                            onChange={() => handleTypeChange(job.value)}
                            className="mr-2 h-4 w-4 accent-purple-600 focus:ring-2 focus:ring-purple-400 rounded-md"
                        />
                        {job.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Filter;
