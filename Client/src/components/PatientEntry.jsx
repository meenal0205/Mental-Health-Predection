import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const PatientEntry = ({ name, location }) => {
    return (
        <div className='shadow-md rounded-md p-3 bg-white'>
            <div className='flex gap-5 font-mono'>
                <div className='p-2 rounded-full border-2 border-[#46325d] my-auto'>
                    <Icon icon="tdesign:user-filled" color='#46325d' width={25} />
                </div>
                <div>
                    <h2 className='font-semibold'>
                        {name}
                    </h2>
                    <p>{location}</p>
                </div>
            </div>
        </div>
    )
}

export default PatientEntry