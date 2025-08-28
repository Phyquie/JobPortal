"use client";
import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "@/redux/slices/userSlice";
import { use } from 'react'
import { useUser } from "@clerk/nextjs";
import ProfilePageSkeleton from "@/component/skeletons/ProfilePageSkeleton";
import { useUpdateUserMutation } from "@/redux/slices/userSlice";
import { set } from "lodash";





export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useUser();
  const { data: userData, isLoading } = useGetUserByIdQuery(id);
  const [isUpdating, setIsUpdating] = useState(false);

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    savedResumeUrl: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;
  
          const reader = new FileReader();
          reader.onloadend = () => {
              setUserForm((prev) => ({ ...prev, savedResumeUrl: (reader.result as string) || "" }));
          };
          reader.readAsDataURL(file);
      };

  const [updateUser, isLoadingUpdate] = useUpdateUserMutation();

  useEffect(() => {
    if (userData) {
      setUserForm({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        savedResumeUrl: userData.savedResumeUrl || "",
      });
    }
  }, [userData]);

  if (isLoading) {
    return <ProfilePageSkeleton />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    setIsUpdating(true);
    await updateUser({ id, ...userForm });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-6">
      <div className="max-w-6xl w-full bg-[#1a1a1a] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-xl">
        {/* Left panel */}
        <div className="bg-gradient-to-br from-[#a989f6] via-[#9474d6] to-[#8370ee] text-white p-6 md:p-10 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              {user && user.id && id === user.id ? `Welcome, ${userForm.firstName}!` : `Profile of ${userForm.firstName}`}
            </h2>
            <p className="text-sm md:text-base opacity-90">
              {user && user.id && id === user.id ? `Manage your profile, view your applications, and keep your resume updated.` : `View other profile details`}
            </p>
          </div>

          {user && user.id && id === user.id && (
            <div className="mt-6 md:mt-8 text-xs md:text-sm hidden md:block">
              <h3 className="font-semibold mb-2">Profile Features:</h3>
              <ul className="space-y-1">
                <li>✔ View and edit personal info</li>
                <li>✔ Resume upload & preview</li>
                <li>✔ Secure and private</li>
                <li>✔ Optimized for employers</li>
              </ul>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="p-6 md:p-10 text-white bg-[#121212]">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">My Profile</h2>
          <p className="text-sm text-gray-400 mb-6">
            {user && user.id && id === user.id
              ? "Update your personal information and resume."
              : "Viewing profile of another user."}
          </p>


          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader"></div>
            </div>
          ) : (
            <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={userForm.firstName}
                  disabled
                  placeholder="First Name"
                  className="flex-1 p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400 text-sm"
                  onChange={(e) => setUserForm((prev) => ({ ...prev, firstName: e.target.value }))}
                />
                <input
                  type="text"
                  value={userForm.lastName}
                  disabled
                  placeholder="Last Name"
                  className="flex-1 p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400 text-sm"
                  onChange={(e) => setUserForm((prev) => ({ ...prev, lastName: e.target.value }))}
                />
              </div>

              <input
                type="email"
                value={userForm.email}
                disabled
                placeholder="Email"
                className="w-full p-3 rounded bg-[#2a2a2a] border-none text-white placeholder-gray-400 text-sm"
                onChange={(e) => setUserForm((prev) => ({ ...prev, email: e.target.value }))}
              />

              <div className="w-full p-3 rounded bg-[#2a2a2a] border-none text-gray-300 flex justify-between items-center text-sm">
                <span>
                  {userForm.savedResumeUrl ? "Resume Already Uploaded" : "No Resume Uploaded"}
                </span>
                {userForm.savedResumeUrl && (
                  <a
                    href={userForm.savedResumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline text-xs"
                  >
                    View Resume
                  </a>
                )}
              </div>
             { user && user.id && id === user.id &&  <div>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleImageChange}
                name="resume"
              />
              <label
                htmlFor="resume-upload"
                className="w-full flex items-center justify-center bg-[#2a2a2a] border border-dashed border-gray-500 rounded cursor-pointer py-3 text-gray-300 hover:bg-[#232323] transition-colors text-sm mt-2"
              >
                {userForm.savedResumeUrl ? "Update Resume" : "Upload Resume"}
              </label>
              </div>
}

            
                {user && user.id && id === user.id ?    <button
                type="submit"
                className="bg-[#a989f6] hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded mt-4 w-full text-sm"
              >{isUpdating? "Updating..." : "Update Profile"}</button> : "Nahh ! You can't update this profile"}

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
