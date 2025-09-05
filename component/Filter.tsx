import React, { useEffect, useState } from 'react';

import { useGetMaxSalaryQuery } from '@/redux/slices/featureapislice';
import { max } from 'lodash';



type FilterProps = {
    onTypeChange: (type: string) => void;
    onCategoryChange?: (categories: string) => void;
    onSalaryChange?: (salary: number) => void;
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

const Filter = ({ onTypeChange, onCategoryChange , onSalaryChange }: FilterProps) => {

    const { data: maxSalary } = useGetMaxSalaryQuery();
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string>("");
    const [maxValue, setMaxValue] = useState<number>();


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

    useEffect(() => {
        if (maxSalary) {
            setMaxValue(maxSalary);
        }
    }, [maxSalary]);

    console.log("Max Salary from API:", maxSalary);

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
    const handleSliderValue = (value: number) => {
        setMaxValue(value);
        if (onSalaryChange) {
            onSalaryChange(value);
        }
        console.log("Slider Value:", value);
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
                        <div className="flex flex-col text-white mb-8">
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

            <div>
                 <div className="text-2xl font-bold text-white whitespace-nowrap mb-6">
                Salary
            </div>
                <input type='range' min='0' max={maxSalary} value={maxValue} step='10000'  onChange={(e) => handleSliderValue(parseInt(e.target.value))} />

               <div className='font-bold'>₹0 - ₹{maxValue ? rupeeFn(maxValue) : '0'}</div>
            </div>
        </div>
    );
};

export default Filter;
