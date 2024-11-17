import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const TherapistEntry = ({ name, number }) => {
    return (
        <div className='shadow-md rounded-md p-3 bg-white'>
            <div className='flex gap-5'>
                <div className='p-2 rounded-full border-2 border-[#46325d]'>
                    <Icon icon="fa6-solid:user-doctor" className='text-[#46325d]' width={25} />
                </div>
                <div>
                    <h2 className='font-semibold text-[#46325d]'>{name}</h2>
                    <h3>{number}</h3>
                </div>
            </div>
            <div>
                <button className='bg-[#46325d] text-white rounded-md p-1 mt-2 w-full'>Consult</button>
            </div>
        </div>
    )
}

export default TherapistEntry