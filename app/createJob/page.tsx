"use client";

import { set, useForm } from "react-hook-form";
import { useGetCompanyQuery } from "@/redux/slices/companySlice";
import { useCreateJobMutation } from "@/redux/slices/featureapislice";
import { useEffect, useState } from "react";
// Make sure imagetoUrl accepts a File type as argument, or update its definition accordingly.


export default function CreateJobPage() {

  const [createJob, { isLoading: creatingJob }] = useCreateJobMutation();

  const [formData, setFormData] = useState({
    title: "",
    companyId: "",
    location: "",
    pin: "",
    type: "",
    salary: "",
    skills: "",
    category: "",
    description: "",
  });



  const handlesubmit = () => {
    console.log("Job Data:", formData);
    createJob(formData);
    setFormData({
      title: "",
      companyId: "",
      location: "",
      pin: "",
      type: "",
      salary: "",
      skills: "",
      category: "",
      description: ""
    });

  };

  const { data: company, isLoading: loadingCompany } = useGetCompanyQuery({});
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full bg-[#1a1a1a] rounded-2xl overflow-hidden grid md:grid-cols-2 shadow-xl">
        {/* Left panel */}
        <div className="bg-gradient-to-br from-[#a989f6] via-[#9474d6] to-[#8370ee] text-white p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">One platform for digital hiring</h2>
            <p className="text-sm opacity-90">
              Streamline your job posting with advanced tools, AI-powered screening, and integrated candidate tracking.
            </p>
          </div>
          <div className="mt-8 text-sm">
            <h3 className="font-semibold mb-2">Job Features:</h3>
            <ul className="space-y-1">
              <li>✔ Full-Time / Part-Time / Internship</li>
              <li>✔ Location-Based & Remote</li>
              <li>✔ File Upload Support</li>
              <li>✔ Custom Skill Filters</li>
            </ul>
          </div>
        </div>

        {/* Right panel */}
        <div className="p-8 md:p-10 text-white bg-[#121212]">
          <h2 className="text-2xl font-semibold mb-2">Create Job</h2>
          <p className="text-sm text-gray-400 mb-6">Post your job and attract top candidates.</p>

          <div className="space-y-4 text-sm">
            <div className="flex gap-4">
              <input
                placeholder="Job Title"
                className="flex-1 p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <select
                className="flex-1 p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400"
                value={formData.companyId}
                onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
              >
                <option value="">Select Company</option>
                {company?.map((comp: any) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <input
                placeholder="Location"
                className="flex-1 p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <input
                placeholder="Pin Code"
                className="flex-1 p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400"
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
              />

            </div>

            <div className="flex gap-4">
              <select
                className="flex-1 p-3 rounded bg-[#2a2a2a] border-none text-white"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="">Job Type</option>
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>

              <input
                type="number"
                placeholder="Salary (Annual)"
                className="flex-1 p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>

            <input
              placeholder="Required Skills (e.g. React, Node.js)"
              className="w-full p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />

            <select
              className="w-full p-3 rounded bg-[#2a2a2a] border-none text-white"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Category</option>
              <option value="engineering">Engineering</option>
              <option value="product">Software Development</option>
              <option value="data">Data Science</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
              <option value="sales">Sales</option>
              <option value="hr">Human Resources</option>
              <option value="finance">Finance</option>
              <option value="other">Other</option>
            </select>

            <textarea
              placeholder="Job Description"
              className="w-full h-32 p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />


            < button
              className="bg-[#a989f6] hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded mt-4 w-full"
              onClick={handlesubmit}
            >
              Post Job
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}
