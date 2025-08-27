"use client";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Applicant {
  id: string;
  resumeUrl: string;
  coverLetter: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface DownloadApplicantsProps {
  applicants: Applicant[];
}

const DownloadApplicants: React.FC<DownloadApplicantsProps> = ({ applicants }) => {
  const exportToExcel = () => {
    // Pick only the required fields
    const formattedData = applicants.map(applicant => ({
      Name: `${applicant.user.firstName} ${applicant.user.lastName}`,
      Email: applicant.user.email,
      ResumeURL: applicant.resumeUrl,
    }));

    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Save file
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Applicants.xlsx");
  };

  return (
    <button
      onClick={exportToExcel}
      className=" text-sm rounded-lg px-3 py-1 bg-[#1a1a1a] border border-white max-w-min truncate"
    >
      Download List
    </button>
  );
};

export default DownloadApplicants;
