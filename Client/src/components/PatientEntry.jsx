import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllDiaryEntriesByUsername } from '../services/services'

const PatientEntry = ({ name, location }) => {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/details", { state: { name: name } })

    }
    return (
        <div className='shadow-md rounded-md p-3 bg-white cursor-pointer' onClick={handleClick}>
            <div className='flex gap-5 font-mono'>
                <div className='p-2 rounded-full border-2 border-[#46325d] my-auto'>
                    <Icon icon="tdesign:user-filled" className='text-[#46325d]' width={25} />
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