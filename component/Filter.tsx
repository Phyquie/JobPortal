import React, { useState } from 'react';

type FilterProps = {
    onTypeChange: (type: string) => void;
    onCategoryChange?: (categories: string) => void;
};

const jobCategories = [
  { label: "Engineering", value: "engineering" },
  { label: "Product", value: "product" },
  { label: "Data", value: "data" },
  { label: "Marketing", value: "marketing" },
  { label: "Design", value: "design" },
  { label: "Sales", value: "sales" },
  { label: "HR", value: "hr" },
  { label: "Finance", value: "finance" },
  { label: "Other", value: "other" },
];

const Filter = ({ onTypeChange, onCategoryChange }: FilterProps) => {
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string>("");

    const handleTypeChange = (value: string) => {
        const newValue = selectedType === value ? "" : value; // toggle behavior
        setSelectedType(newValue);
        onTypeChange(newValue);
    };

    const handleCategoryChange = (value: string) => {
        const newValue = selectedCategories === value ? "" : value; // toggle behavior
        setSelectedCategories(newValue);
        if (onCategoryChange) {
            onCategoryChange(newValue);
        }
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
            <div className="flex flex-col text-white mb-8">
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
            <div className="text-2xl font-bold text-white whitespace-nowrap mb-6">
                Job Category
            </div>
            <div className="flex flex-col text-white">
                {jobCategories.map((cat) => (
                    <label key={cat.value} className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedCategories === cat.value}
                            onChange={() => handleCategoryChange(cat.value)}
                            className="mr-2 h-4 w-4 accent-purple-600 focus:ring-2 focus:ring-purple-400 rounded-md"
                        />
                        {cat.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Filter;
