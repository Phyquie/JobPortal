"use client";
import { useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  savedResumeUrl?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    firstName: "Ayush",
    lastName: "Bisht",
    email: "ayush@example.com",
    savedResumeUrl: "/resume.pdf",
  });

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full bg-[#1a1a1a] rounded-2xl overflow-hidden grid md:grid-cols-2 shadow-xl">
        {/* Left panel */}
        <div className="bg-gradient-to-br from-[#a989f6] via-[#9474d6] to-[#8370ee] text-white p-8 md:p-10 flex flex-col justify-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Welcome to the Profile Page, {user.firstName}!</h2>
            <p className="text-sm opacity-90">
              Manage your profile, view your applications, and keep your resume updated.
            </p>
          </div>

          <div className="mt-8 text-sm">
            <h3 className="font-semibold mb-2">Profile Features:</h3>
            <ul className="space-y-1">
              <li>✔ View and edit personal info</li>
              <li>✔ Resume upload & preview</li>
              <li>✔ Secure and private</li>
              <li>✔ Optimized for employers</li>
            </ul>
          </div>
        </div>

        {/* Right panel */}
        <div className="p-8 md:p-10 text-white bg-[#121212]">
          <h2 className="text-2xl font-semibold mb-2">My Profile</h2>
          <p className="text-sm text-gray-400 mb-6">View your profile details and manage your resume.</p>

          <form className="space-y-4 text-sm">
            <div className="flex gap-4">
              <input
                type="text"
                value={user.firstName}
                disabled
                placeholder="First Name"
                className="flex-1 p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400"
              />
              <input
                type="text"
                value={user.lastName}
                disabled
                placeholder="Last Name"
                className="flex-1 p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400"
              />
            </div>

            <input
              type="email"
              value={user.email}
              disabled
              placeholder="Email"
              className="w-full p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400"
            />

            <div className="w-full p-3 rounded bg-[#2a2a2a] border-none text-gray-300 flex justify-between items-center">
              <span>
                {user.savedResumeUrl ? "Resume Uploaded" : "No Resume Uploaded"}
              </span>
              {user.savedResumeUrl && (
                <a
                  href={user.savedResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline text-sm"
                >
                  View Resume
                </a>
              )}
            </div>

            <input
              type="file"
              accept=".pdf"
              className="w-full text-gray-300"
            />

            <button
              type="submit"
              className="bg-[#a989f6] hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded mt-4 w-full"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
