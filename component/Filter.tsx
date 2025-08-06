import React from 'react'

const Filter = () => {
    return (
        <div className='min-h-max flex-col px-8 border-r border-white '>

            <div className='text-2xl font-bold  text-white whitespace-nowrap mb-6'>Job Type</div>
            <div className='flex flex-col text-white' >
                <div className='flex items-center'>
                    <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-purple-600 focus:ring-2 focus:ring-purple-400"
                        style={{ borderRadius: '100px' }}
                        value={"full_time"}
                    />
                    <label>Full Time</label>
                </div>
                <div className='flex items-center'>
                    <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-purple-600 focus:ring-2 focus:ring-purple-400"
                        style={{ borderRadius: '100px' }}
                        value={"part_time"}
                    />                    <label>Part Time</label>
                </div>
                <div className='flex items-center'>
                    <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-purple-600 focus:ring-2 focus:ring-purple-400"
                        style={{ borderRadius: '100px' }}
                        value={"contract"}
                    />                    <label>Contract</label>
                </div>
                <div className='flex items-center'>
                    <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-purple-600 focus:ring-2 focus:ring-purple-400"
                        style={{ borderRadius: '100px' }}
                        value={"internship"}
                    />                    <label>Internship</label>
                </div>

            </div>
        </div>


    )
}

export default Filter