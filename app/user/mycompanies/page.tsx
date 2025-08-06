'use client'
import React from 'react'

import { CompanyButton } from '@/component/company/CreateCompanyButton'
import { UpdateCompanyButton } from '@/component/company/UpdateCompanyButton'
import { useGetCompanyQuery, useDeleteCompanyMutation } from '@/redux/slices/companySlice'
import { Key } from 'lucide-react'

const page = () => {

    const { data: companies, isLoading, error } = useGetCompanyQuery({})
    const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation()
    const [deleteId, setDeleteId] = React.useState<string | null>(null)
    console.log('Companies fetched:', companies)

    return (
        <div className='min-h-screen w-full flex justify-center   bg-black'>
            <div className='text-2xl flex rounded-xl w-full  max-w-4xl flex-col bg-[#1a1a1a] text-white px-8 py-10 shadow-lg space-y-4'>
                <div className='flex justify-between items-center font-bold'>
                    My Companies
                </div>
                <div className='text-sm text-gray-400'>Manage your companies and post jobs</div>
                <CompanyButton />
                <div className='flex flex-col'>
                    {companies?.length > 0 && !isLoading ? (
                        <div className='w-full max-w-4xl mt-6 bg-[#1a1a1a] rounded-2xl shadow-lg px-8 py-10 space-y-4'>
                            {companies.map((company: any) => (
                                <div key={company.id} className='flex justify-between items-center border-b border-gray-700 py-4'>
                                    <div>
                                        <div className='text-lg font-bold'>{company?.name}</div>
                                        <div className='text-sm text-gray-400'>{company?.description}</div>
                                    </div>
                                    <div className='flex gap-4'>
                                        {/* Add buttons for edit and delete functionality */}
                                        <UpdateCompanyButton companyId={company.id} />
                                        <button className='bg-gray-900 text-sm rounded-2xl px-3 py-1' id={`delete-${company.id}`} onClick={() => {
                                            deleteCompany(company.id)
                                            setDeleteId(company.id)

                                        }
                                        }>{isDeleting && deleteId === company.id ? "Deleting..." : "Delete"}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center flex justify-center items-center text-gray-500 mt-6'>{isLoading ? <div className='loader'></div> : "No companies found. Please create one."}</div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default page