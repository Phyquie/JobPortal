'use client';
import image22 from '../public/3395620.jpg'
import Searchbar from '@/component/Searchbar';
import JobLists from '@/component/JobLists';
import Footer from '@/component/Footer';
import { useCreateClerkMutation } from '@/redux/slices/clerkSlice';
import { useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";

export default function Home() {
  const [createClerk] = useCreateClerkMutation();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      createClerk({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
      });
    }
  }, [user, createClerk]);

  return (
    <div className="flex flex-col min-h-screen text-white relative bg-[#2f2b4e]">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full z-0 h-[60vh] sm:h-[60vh] md:h-[70vh]"
        style={{
          backgroundImage: `url(${image22.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 px-2 sm:px-6 md:px-12 lg:px-20 pt-8 sm:pt-12">
        <Searchbar />

        <div className="flex  flex-col mt-8 gap-6">
          <JobLists />
        </div>
      </div>
      <Footer />

    </div>
  );
}
